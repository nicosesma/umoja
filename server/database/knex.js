require('../../../config/environment')

import Knex from 'knex'

const config = require('../../../knexfile')[process.env.NODE_ENV]

const knex = Knex(config)

knex.truncateAllTables = function() {
  return knex.schema.raw(`
    BEGIN;
    TRUNCATE users RESTART IDENTITY CASCADE;
    TRUNCATE vendor_spots RESTART IDENTITY CASCADE;
    COMMIT;
  `)
}

export default knex
