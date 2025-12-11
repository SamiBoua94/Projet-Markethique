const express = require('express');
const db = require('../config/db');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const categories = await db('categories').select('*');
    return res.json(categories);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
