const express = require('express');
const { body, param } = require('express-validator');
const db = require('../config/db');
const validate = require('../middlewares/validate');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get(
  '/products/:id/reviews',
  validate([param('id').isInt()]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const reviews = await db('reviews')
        .where('product_id', id)
        .leftJoin('users', 'reviews.user_id', 'users.id')
        .select('reviews.*', 'users.name as user_name');
      return res.json(reviews);
    } catch (err) {
      return next(err);
    }
  },
);

router.post(
  '/products/:id/reviews',
  auth(),
  validate([
    param('id').isInt(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').optional().isString(),
  ]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { rating, comment } = req.body;
      const userId = req.user.id;

      // Simple check: only allow if user has at least one order item for this product
      const hasBought = await db('order_items')
        .where({ product_id: id })
        .join('orders', 'order_items.order_id', 'orders.id')
        .where('orders.buyer_id', userId)
        .first();

      if (!hasBought) {
        return res
          .status(403)
          .json({ message: 'You must have purchased this product to review it' });
      }

      const now = new Date().toISOString();
      const [reviewId] = await db('reviews').insert({
        product_id: id,
        user_id: userId,
        rating,
        comment: comment || null,
        created_at: now,
        updated_at: now,
      });

      const review = await db('reviews').where({ id: reviewId }).first();
      return res.status(201).json(review);
    } catch (err) {
      return next(err);
    }
  },
);

router.put(
  '/reviews/:id',
  auth(),
  validate([
    param('id').isInt(),
    body('rating').optional().isInt({ min: 1, max: 5 }),
    body('comment').optional().isString(),
  ]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const review = await db('reviews').where({ id }).first();
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      if (review.user_id !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not allowed to update this review' });
      }

      const updates = { ...req.body, updated_at: new Date().toISOString() };

      await db('reviews').where({ id }).update(updates);
      const updated = await db('reviews').where({ id }).first();
      return res.json(updated);
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/reviews/:id',
  auth(),
  validate([param('id').isInt()]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const review = await db('reviews').where({ id }).first();
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }

      if (review.user_id !== userId && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not allowed to delete this review' });
      }

      await db('reviews').where({ id }).del();
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
