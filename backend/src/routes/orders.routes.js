const express = require('express');
const { body, param } = require('express-validator');
const db = require('../config/db');
const validate = require('../middlewares/validate');
const { auth, requireRole } = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/',
  auth(),
  requireRole('buyer'),
  validate([
    body('items').isArray({ min: 1 }),
    body('items.*.product_id').isInt(),
    body('items.*.quantity').isInt({ min: 1 }),
    body('address_id').optional().isInt(),
    body('payment_method').optional().isString(),
  ]),
  async (req, res, next) => {
    try {
      const { items, address_id, payment_method } = req.body;
      const buyerId = req.user.id;

      const productIds = items.map((i) => i.product_id);
      const products = await db('products').whereIn('id', productIds);

      if (products.length !== productIds.length) {
        return res.status(400).json({ message: 'One or more products not found' });
      }

      let total = 0;
      const orderItems = [];

      for (const item of items) {
        const product = products.find((p) => p.id === item.product_id);
        if (!product.is_active || product.stock < item.quantity) {
          return res.status(400).json({ message: 'Product unavailable or not enough stock' });
        }
        const lineTotal = Number(product.price) * item.quantity;
        total += lineTotal;
        orderItems.push({
          product_id: product.id,
          seller_id: product.seller_id,
          quantity: item.quantity,
          unit_price: product.price,
        });
      }

      const now = new Date().toISOString();

      const [orderId] = await db('orders').insert({
        buyer_id: buyerId,
        address_id: address_id || null,
        total_amount: total,
        status: 'pending',
        payment_method: payment_method || 'card',
        paid: true,
        created_at: now,
        updated_at: now,
      });

      for (const item of orderItems) {
        await db('order_items').insert({
          ...item,
          order_id: orderId,
          created_at: now,
          updated_at: now,
        });
        await db('products')
          .where({ id: item.product_id })
          .decrement('stock', item.quantity);
      }

      const order = await db('orders').where({ id: orderId }).first();

      return res.status(201).json(order);
    } catch (err) {
      return next(err);
    }
  },
);

router.get('/', auth(), async (req, res, next) => {
  try {
    const user = req.user;

    let query = db('orders').select('*');

    if (user.role === 'buyer') {
      query = query.where('buyer_id', user.id);
    } else if (user.role === 'seller') {
      query = query.whereIn('id', function () {
        this.select('order_id').from('order_items').where('seller_id', user.id);
      });
    }

    const orders = await query.orderBy('created_at', 'desc');
    return res.json(orders);
  } catch (err) {
    return next(err);
  }
});

router.get(
  '/:id',
  auth(),
  validate([param('id').isInt()]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = req.user;

      const order = await db('orders').where({ id }).first();
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      if (
        user.role !== 'admin' &&
        order.buyer_id !== user.id &&
        !(await db('order_items').where({ order_id: id, seller_id: user.id }).first())
      ) {
        return res.status(403).json({ message: 'Not allowed to view this order' });
      }

      const items = await db('order_items')
        .where('order_id', id)
        .leftJoin('products', 'order_items.product_id', 'products.id')
        .select('order_items.*', 'products.title');

      return res.json({ ...order, items });
    } catch (err) {
      return next(err);
    }
  },
);

router.put(
  '/:id/status',
  auth(),
  requireRole('seller', 'admin'),
  validate([
    param('id').isInt(),
    body('status').isIn(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
  ]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const user = req.user;

      const order = await db('orders').where({ id }).first();
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      if (user.role === 'seller') {
        const sellerHasItem = await db('order_items')
          .where({ order_id: id, seller_id: user.id })
          .first();
        if (!sellerHasItem) {
          return res.status(403).json({ message: 'Not allowed to update this order' });
        }
      }

      await db('orders').where({ id }).update({ status, updated_at: new Date().toISOString() });
      const updated = await db('orders').where({ id }).first();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
