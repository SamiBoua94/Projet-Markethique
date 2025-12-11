const express = require('express');
const { body, param } = require('express-validator');
const db = require('../config/db');
const validate = require('../middlewares/validate');
const { auth } = require('../middlewares/auth');

const router = express.Router();

// Liste des conversations (par utilisateur distinct)
router.get('/conversations', auth(), async (req, res, next) => {
  try {
    const userId = req.user.id;

    const raw = await db('messages')
      .where('sender_id', userId)
      .orWhere('receiver_id', userId)
      .orderBy('created_at', 'desc');

    const map = new Map();
    for (const msg of raw) {
      const otherId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
      if (!map.has(otherId)) {
        map.set(otherId, msg);
      }
    }

    const conversations = [];
    for (const [otherId, lastMessage] of map.entries()) {
      const otherUser = await db('users').where({ id: otherId }).first();
      conversations.push({
        user: { id: otherUser.id, name: otherUser.name, email: otherUser.email },
        lastMessage,
      });
    }

    return res.json(conversations);
  } catch (err) {
    return next(err);
  }
});

// Messages avec un utilisateur donné
router.get(
  '/conversations/:userId',
  auth(),
  validate([param('userId').isInt()]),
  async (req, res, next) => {
    try {
      const userId = req.user.id;
      const otherId = Number(req.params.userId);

      const messages = await db('messages')
        .where((qb) => {
          qb.where('sender_id', userId).andWhere('receiver_id', otherId);
        })
        .orWhere((qb) => {
          qb.where('sender_id', otherId).andWhere('receiver_id', userId);
        })
        .orderBy('created_at', 'asc');

      return res.json(messages);
    } catch (err) {
      return next(err);
    }
  },
);

// Envoyer un message
router.post(
  '/',
  auth(),
  validate([
    body('receiver_id').isInt(),
    body('content').isString().notEmpty(),
    body('order_id').optional().isInt(),
    body('product_id').optional().isInt(),
  ]),
  async (req, res, next) => {
    try {
      const senderId = req.user.id;
      const { receiver_id, content, order_id, product_id } = req.body;
      const now = new Date().toISOString();

      const [id] = await db('messages').insert({
        sender_id: senderId,
        receiver_id,
        order_id: order_id || null,
        product_id: product_id || null,
        content,
        created_at: now,
        updated_at: now,
      });

      const message = await db('messages').where({ id }).first();
      return res.status(201).json(message);
    } catch (err) {
      return next(err);
    }
  },
);

module.exports = router;
