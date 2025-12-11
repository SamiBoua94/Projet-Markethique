exports.up = function (knex) {
  return knex.schema
    .createTable('addresses', (table) => {
      table.increments('id').primary();
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.string('label');
      table.string('full_name').notNullable();
      table.string('address_line1').notNullable();
      table.string('address_line2');
      table.string('city').notNullable();
      table.string('postal_code').notNullable();
      table.string('country').notNullable();
      table.string('phone');
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('orders', (table) => {
      table.increments('id').primary();
      table
        .integer('buyer_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table
        .integer('address_id')
        .unsigned()
        .references('id')
        .inTable('addresses')
        .onDelete('SET NULL');
      table.decimal('total_amount', 10, 2).notNullable().defaultTo(0);
      table
        .enu('status', ['pending', 'processing', 'shipped', 'delivered', 'cancelled'])
        .notNullable()
        .defaultTo('pending');
      table.string('payment_method');
      table.boolean('paid').notNullable().defaultTo(false);
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
    .createTable('order_items', (table) => {
      table.increments('id').primary();
      table
        .integer('order_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('orders')
        .onDelete('CASCADE');
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('RESTRICT');
      table
        .integer('seller_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE');
      table.integer('quantity').notNullable().defaultTo(1);
      table.decimal('unit_price', 10, 2).notNullable();
      table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders')
    .dropTableIfExists('addresses');
};
