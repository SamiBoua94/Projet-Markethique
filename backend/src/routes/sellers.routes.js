const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET /api/sellers/:id - Get seller profile
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    // Get seller profile with user info
    const seller = await db('users')
      .join('seller_profiles', 'users.id', 'seller_profiles.user_id')
      .where('users.id', id)
      .andWhere('users.role', 'seller')
      .andWhere('users.is_active', true)
      .select(
        'users.id',
        'users.name',
        'users.email',
        'users.created_at as member_since',
        'seller_profiles.shop_name',
        'seller_profiles.description',
        'seller_profiles.logo_url',
        'seller_profiles.phone',
        'seller_profiles.address'
      )
      .first();

    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    // Get product count
    const productCountResult = await db('products')
      .where('seller_id', id)
      .andWhere('is_active', true)
      .count('id as count')
      .first();

    // Get average rating from reviews on seller's products
    const ratingResult = await db('reviews')
      .join('products', 'reviews.product_id', 'products.id')
      .where('products.seller_id', id)
      .avg('reviews.rating as average_rating')
      .count('reviews.id as review_count')
      .first();

    // Get total orders (sales count)
    const salesResult = await db('order_items')
      .join('products', 'order_items.product_id', 'products.id')
      .where('products.seller_id', id)
      .count('order_items.id as sales_count')
      .first();

    res.json({
      ...seller,
      product_count: productCountResult?.count || 0,
      average_rating: ratingResult?.average_rating ? parseFloat(ratingResult.average_rating).toFixed(1) : null,
      review_count: ratingResult?.review_count || 0,
      sales_count: salesResult?.sales_count || 0,
      is_verified: true // Placeholder - could be a real field in the database
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/sellers/:id/products - Get seller's products
router.get('/:id/products', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, sort = 'newest', page = 1, limit = 12 } = req.query;

    let query = db('products')
      .leftJoin('categories', 'products.category_id', 'categories.id')
      .where('products.seller_id', id)
      .andWhere('products.is_active', true)
      .select(
        'products.id',
        'products.title',
        'products.description',
        'products.price',
        'products.stock',
        'products.main_image_url',
        'products.created_at',
        'categories.name as category_name',
        'categories.slug as category_slug'
      );

    // Filter by category
    if (category) {
      query = query.where('categories.slug', category);
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        query = query.orderBy('products.price', 'asc');
        break;
      case 'price_desc':
        query = query.orderBy('products.price', 'desc');
        break;
      case 'oldest':
        query = query.orderBy('products.created_at', 'asc');
        break;
      case 'newest':
      default:
        query = query.orderBy('products.created_at', 'desc');
        break;
    }

    // Pagination
    const offset = (parseInt(page) - 1) * parseInt(limit);
    query = query.limit(parseInt(limit)).offset(offset);

    const products = await query;

    // Get ratings for each product
    const productIds = products.map(p => p.id);
    const ratings = await db('reviews')
      .whereIn('product_id', productIds)
      .select('product_id')
      .avg('rating as average_rating')
      .count('id as review_count')
      .groupBy('product_id');

    const ratingsMap = {};
    ratings.forEach(r => {
      ratingsMap[r.product_id] = {
        average_rating: parseFloat(r.average_rating).toFixed(1),
        review_count: r.review_count
      };
    });

    const productsWithRatings = products.map(p => ({
      ...p,
      average_rating: ratingsMap[p.id]?.average_rating || null,
      review_count: ratingsMap[p.id]?.review_count || 0
    }));

    // Get total count for pagination
    const totalResult = await db('products')
      .where('seller_id', id)
      .andWhere('is_active', true)
      .count('id as total')
      .first();

    res.json({
      products: productsWithRatings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalResult?.total || 0,
        pages: Math.ceil((totalResult?.total || 0) / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/sellers/:id/reviews - Get reviews for seller's products
router.get('/:id/reviews', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const reviews = await db('reviews')
      .join('products', 'reviews.product_id', 'products.id')
      .join('users', 'reviews.user_id', 'users.id')
      .where('products.seller_id', id)
      .select(
        'reviews.id',
        'reviews.rating',
        'reviews.comment',
        'reviews.created_at',
        'users.name as reviewer_name',
        'products.title as product_title',
        'products.id as product_id'
      )
      .orderBy('reviews.created_at', 'desc')
      .limit(parseInt(limit))
      .offset(offset);

    // Get rating distribution
    const distribution = await db('reviews')
      .join('products', 'reviews.product_id', 'products.id')
      .where('products.seller_id', id)
      .select('reviews.rating')
      .count('reviews.id as count')
      .groupBy('reviews.rating');

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    distribution.forEach(d => {
      ratingDistribution[d.rating] = d.count;
    });

    // Get total count
    const totalResult = await db('reviews')
      .join('products', 'reviews.product_id', 'products.id')
      .where('products.seller_id', id)
      .count('reviews.id as total')
      .first();

    res.json({
      reviews,
      rating_distribution: ratingDistribution,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalResult?.total || 0,
        pages: Math.ceil((totalResult?.total || 0) / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/sellers - Get all sellers (for listing)
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const sellers = await db('users')
      .join('seller_profiles', 'users.id', 'seller_profiles.user_id')
      .where('users.role', 'seller')
      .andWhere('users.is_active', true)
      .select(
        'users.id',
        'users.name',
        'seller_profiles.shop_name',
        'seller_profiles.description',
        'seller_profiles.logo_url'
      )
      .limit(parseInt(limit))
      .offset(offset);

    // Get product counts and ratings for each seller
    const sellerIds = sellers.map(s => s.id);
    
    const productCounts = await db('products')
      .whereIn('seller_id', sellerIds)
      .andWhere('is_active', true)
      .select('seller_id')
      .count('id as product_count')
      .groupBy('seller_id');

    const ratings = await db('reviews')
      .join('products', 'reviews.product_id', 'products.id')
      .whereIn('products.seller_id', sellerIds)
      .select('products.seller_id')
      .avg('reviews.rating as average_rating')
      .groupBy('products.seller_id');

    const productCountMap = {};
    productCounts.forEach(pc => {
      productCountMap[pc.seller_id] = pc.product_count;
    });

    const ratingsMap = {};
    ratings.forEach(r => {
      ratingsMap[r.seller_id] = parseFloat(r.average_rating).toFixed(1);
    });

    const sellersWithStats = sellers.map(s => ({
      ...s,
      product_count: productCountMap[s.id] || 0,
      average_rating: ratingsMap[s.id] || null
    }));

    res.json(sellersWithStats);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
