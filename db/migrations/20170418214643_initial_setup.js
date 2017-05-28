exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('name').notNullable()
      table.string('email').unique()
      table.string('password').notNullable()
      table.boolean('admin').defaultTo('false')
      table.string('organization').notNullable()
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    }),
    knex.schema.createTable('vendor_spots', table => {
      table.increments('id').primary()
      table.boolean('reserved').defaultTo('false')
      table.integer('user_id')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('vendor_spots')
  ])
};
