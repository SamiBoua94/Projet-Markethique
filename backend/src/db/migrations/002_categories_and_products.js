exports.up = function (knex) {
  return knex.schema
    .createTable('categories', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('slug').notNullable().unique();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('products', (table) => {
      table.increments('id').primary();
      table
        .integer('seller_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('SET NULL');
      table.string('title').notNullable();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.integer('stock').notNullable().defaultTo(0);
      table.boolean('is_active').notNullable().defaultTo(true);
      table.string('main_image_url');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('product_images', (table) => {
      table.increments('id').primary();
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE');
      table.string('image_url').notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('product_images')
    .dropTableIfExists('products')
    .dropTableIfExists('categories');
};
