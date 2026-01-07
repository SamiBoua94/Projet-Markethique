const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const categoryRoutes = require('./routes/categories.routes');
const orderRoutes = require('./routes/orders.routes');
const reviewRoutes = require('./routes/reviews.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const messageRoutes = require('./routes/messages.routes');
const adminRoutes = require('./routes/admin.routes');
const sellerRoutes = require('./routes/sellers.routes');

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sellers', sellerRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(errorHandler);

module.exports = app;
