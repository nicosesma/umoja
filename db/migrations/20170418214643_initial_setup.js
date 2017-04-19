exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.string('email').unique()
      table.string('password').notNullable()
      table.boolean('admin').defaultTo('false')
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    }),
    knex.schema.createTable('vendor_spots', table => {
      table.increments('id').primary()
      table.boolean('reserved').defaultTo('false')
      table.string('contact_name')
      table.string('contact_email')
      table.string('contact_number')
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
