const express = require('express');
const { body, param } = require('express-validator');
const db = require('../config/db');
const validate = require('../middlewares/validate');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get('/', auth(), async (req, res, next) => {
  try {
    const userId = req.user.id;
    const items = await db('wishlist_items')
      .where('wishlist_items.user_id', userId)
      .leftJoin('products', 'wishlist_items.product_id', 'products.id')
      .select('wishlist_items.*', 'products.title', 'products.price', 'products.main_image_url');
    return res.json(items);
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/',
  auth(),
  validate([body('product_id').isInt()]),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { product_id } = req.body;
      const now = new Date().toISOString();

      try {
        await db('wishlist_items').insert({
          user_id: userId,
          product_id,
          created_at: now,
          updated_at: now,
        });
      } catch (e) {
        // ignore unique constraint violation -> déjà dans la wishlist
      }

      const item = await db('wishlist_items').where({ user_id: userId, product_id }).first();
      return res.status(201).json(item);
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/:productId',
  auth(),
  validate([param('productId').isInt()]),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId } = req.params;

      await db('wishlist_items').where({ user_id: userId, product_id: productId }).del();
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
