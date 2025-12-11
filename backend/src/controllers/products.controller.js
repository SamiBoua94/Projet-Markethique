const db = require('../config/db');

async function listProducts(req, res, next) {
  try {
    const { category, search, sort, page = 1, limit = 12 } = req.query;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 12;
    const offset = (pageNum - 1) * limitNum;

    let query = db('products')
      .where('products.is_active', true)
      .leftJoin('categories', 'products.category_id', 'categories.id')
      .leftJoin('users', 'products.seller_id', 'users.id')
      .select(
        'products.*',
        'categories.name as category_name',
        'users.name as seller_name',
      );

    if (category) {
      query = query.andWhere('products.category_id', category);
    }

    if (search) {
      query = query.andWhere((qb) => {
        qb.where('products.title', 'like', `%${search}%`).orWhere(
          'products.description',
          'like',
          `%${search}%`,
        );
      });
    }

    if (sort === 'price_asc') query = query.orderBy('products.price', 'asc');
    else if (sort === 'price_desc') query = query.orderBy('products.price', 'desc');
    else if (sort === 'newest') query = query.orderBy('products.created_at', 'desc');

    const [{ count }] = await db('products')
      .where('products.is_active', true)
      .count({ count: '*' });

    const products = await query.limit(limitNum).offset(offset);

    return res.json({
      data: products,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: Number(count) || 0,
      },
    });
  } catch (err) {
    return next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const { id } = req.params;

    const product = await db('products')
      .where('products.id', id)
      .leftJoin('categories', 'products.category_id', 'categories.id')
      .leftJoin('users', 'products.seller_id', 'users.id')
      .select(
        'products.*',
        'categories.name as category_name',
        'users.name as seller_name',
      )
      .first();

    if (!product || !product.is_active) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const images = await db('product_images').where('product_id', id);

    return res.json({ ...product, images });
  } catch (err) {
    return next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const { title, description, price, stock, category_id } = req.body;
    const sellerId = req.user.id;

    const [productId] = await db('products').insert({
      title,
      description,
      price,
      stock,
      category_id: category_id || null,
      seller_id: sellerId,
      is_active: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    let mainImageUrl = null;
    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        product_id: productId,
        image_url: `/uploads/${file.filename}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      await db('product_images').insert(images);
      mainImageUrl = images[0].image_url;
      await db('products').where({ id: productId }).update({
        main_image_url: mainImageUrl,
        updated_at: new Date().toISOString(),
      });
    }

    const product = await db('products').where({ id: productId }).first();

    return res.status(201).json(product);
  } catch (err) {
    return next(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;
    const updates = { ...req.body };

    const existing = await db('products').where({ id }).first();
    if (!existing) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.user.role !== 'admin' && existing.seller_id !== sellerId) {
      return res.status(403).json({ message: 'Not allowed to update this product' });
    }

    if (typeof updates.is_active !== 'undefined') {
      updates.is_active = updates.is_active ? 1 : 0;
    }

    updates.updated_at = new Date().toISOString();

    await db('products').where({ id }).update(updates);

    if (req.files && req.files.length > 0) {
      const images = req.files.map((file) => ({
        product_id: id,
        image_url: `/uploads/${file.filename}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      await db('product_images').insert(images);
      await db('products')
        .where({ id })
        .update({ main_image_url: images[0].image_url, updated_at: new Date().toISOString() });
    }

    const product = await db('products').where({ id }).first();
    return res.json(product);
  } catch (err) {
    return next(err);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;

    const existing = await db('products').where({ id }).first();
    if (!existing) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.user.role !== 'admin' && existing.seller_id !== sellerId) {
      return res.status(403).json({ message: 'Not allowed to delete this product' });
    }

    await db('products').where({ id }).update({ is_active: 0, updated_at: new Date().toISOString() });

    return res.status(204).send();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
