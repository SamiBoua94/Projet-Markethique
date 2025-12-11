const express = require('express');
const { query, body, param } = require('express-validator');
const multer = require('multer');
const path = require('path');
const validate = require('../middlewares/validate');
const { auth, requireRole } = require('../middlewares/auth');
const productsController = require('../controllers/products.controller');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

router.get(
  '/',
  validate([
    query('category').optional().isInt(),
    query('search').optional().isString(),
    query('sort').optional().isIn(['price_asc', 'price_desc', 'newest', 'popular']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ]),
  productsController.listProducts,
);

router.get(
  '/:id',
  validate([param('id').isInt()]),
  productsController.getProductById,
);

router.post(
  '/',
  auth(),
  requireRole('seller', 'admin'),
  upload.array('images', 5),
  validate([
    body('title').notEmpty(),
    body('price').isFloat({ gt: 0 }),
    body('stock').isInt({ min: 0 }),
    body('category_id').optional().isInt(),
    body('description').optional().isString(),
  ]),
  productsController.createProduct,
);

router.put(
  '/:id',
  auth(),
  requireRole('seller', 'admin'),
  upload.array('images', 5),
  validate([
    param('id').isInt(),
    body('title').optional().notEmpty(),
    body('price').optional().isFloat({ gt: 0 }),
    body('stock').optional().isInt({ min: 0 }),
    body('category_id').optional().isInt(),
    body('description').optional().isString(),
    body('is_active').optional().isBoolean(),
  ]),
  productsController.updateProduct,
);

router.delete(
  '/:id',
  auth(),
  requireRole('seller', 'admin'),
  validate([param('id').isInt()]),
  productsController.deleteProduct,
);

module.exports = router;
