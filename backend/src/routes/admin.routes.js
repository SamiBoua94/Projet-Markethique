const express = require('express');
const { body, param } = require('express-validator');
const db = require('../config/db');
const validate = require('../middlewares/validate');
const { auth, requireRole } = require('../middlewares/auth');

const router = express.Router();

router.use(auth(), requireRole('admin'));

// Utilisateurs
router.get('/users', async (req, res, next) => {
  try {
    const users = await db('users').select('id', 'name', 'email', 'role', 'is_active');
    return res.json(users);
  } catch (err) {
    return next(err);
  }
});

router.put(
  '/users/:id',
  validate([
    param('id').isInt(),
    body('role').optional().isIn(['buyer', 'seller', 'admin']),
    body('is_active').optional().isBoolean(),
  ]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updates = { ...req.body };

      if (typeof updates.is_active !== 'undefined') {
        updates.is_active = updates.is_active ? 1 : 0;
      }
      updates.updated_at = new Date().toISOString();

      await db('users').where({ id }).update(updates);
      const user = await db('users').where({ id }).first();
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  },
);

// Produits
router.get('/products', async (req, res, next) => {
  try {
    const products = await db('products')
      .leftJoin('users', 'products.seller_id', 'users.id')
      .select('products.*', 'users.name as seller_name');
    return res.json(products);
  } catch (err) {
    return next(err);
  }
});

// Avis
router.get('/reviews', async (req, res, next) => {
  try {
    const reviews = await db('reviews')
      .leftJoin('products', 'reviews.product_id', 'products.id')
      .leftJoin('users', 'reviews.user_id', 'users.id')
      .select(
        'reviews.*',
        'products.title as product_title',
        'users.name as user_name',
      );
    return res.json(reviews);
  } catch (err) {
    return next(err);
  }
});

router.delete(
  '/reviews/:id',
  validate([param('id').isInt()]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await db('reviews').where({ id }).del();
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
);

// Catégories CRUD
router.post(
  '/categories',
  validate([body('name').notEmpty(), body('slug').notEmpty()]),
  async (req, res, next) => {
    try {
      const { name, slug } = req.body;
      const now = new Date().toISOString();
      const [id] = await db('categories').insert({ name, slug, created_at: now, updated_at: now });
      const category = await db('categories').where({ id }).first();
      return res.status(201).json(category);
    } catch (err) {
      return next(err);
    }
  },
);

router.put(
  '/categories/:id',
  validate([param('id').isInt(), body('name').optional(), body('slug').optional()]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updates = { ...req.body, updated_at: new Date().toISOString() };
      await db('categories').where({ id }).update(updates);
      const category = await db('categories').where({ id }).first();
      return res.json(category);
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/categories/:id',
  validate([param('id').isInt()]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await db('categories').where({ id }).del();
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
);

// Coupons basiques
router.get('/coupons', async (req, res, next) => {
  try {
    const coupons = await db('coupons').select('*');
    return res.json(coupons);
  } catch (err) {
    return next(err);
  }
});

router.post(
  '/coupons',
  validate([
    body('code').notEmpty(),
    body('discount_type').isIn(['percent', 'fixed']),
    body('discount_value').isFloat({ gt: 0 }),
  ]),
  async (req, res, next) => {
    try {
      const { code, discount_type, discount_value, is_active, valid_from, valid_to } = req.body;
      const now = new Date().toISOString();
      const [id] = await db('coupons').insert({
        code,
        discount_type,
        discount_value,
        is_active: typeof is_active === 'boolean' ? (is_active ? 1 : 0) : 1,
        valid_from: valid_from || null,
        valid_to: valid_to || null,
        created_at: now,
        updated_at: now,
      });
      const coupon = await db('coupons').where({ id }).first();
      return res.status(201).json(coupon);
    } catch (err) {
      return next(err);
    }
  },
);

router.put(
  '/coupons/:id',
  validate([
    param('id').isInt(),
    body('discount_type').optional().isIn(['percent', 'fixed']),
    body('discount_value').optional().isFloat({ gt: 0 }),
  ]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updates = { ...req.body };
      if (typeof updates.is_active !== 'undefined') {
        updates.is_active = updates.is_active ? 1 : 0;
      }
      updates.updated_at = new Date().toISOString();
      await db('coupons').where({ id }).update(updates);
      const coupon = await db('coupons').where({ id }).first();
      return res.json(coupon);
    } catch (err) {
      return next(err);
    }
  },
);

router.delete(
  '/coupons/:id',
  validate([param('id').isInt()]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await db('coupons').where({ id }).del();
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
