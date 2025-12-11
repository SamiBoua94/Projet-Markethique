const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate');
const authController = require('../controllers/auth.controller');
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/register',
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['buyer', 'seller']).withMessage('Role must be buyer or seller'),
  ]),
  authController.register,
);

router.post(
  '/login',
  validate([
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  authController.login,
);

router.get('/me', auth(), authController.me);

module.exports = router;
