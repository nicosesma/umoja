import knex from './knex'

const getRecords = table => knex.table(table).select('*')

const getRecordById = (table, id) => {
  return knex
    .table(table)
    .where({id})
    .first('*')
}

const getAllUsers = () => getRecords('users')

const getUserByEmail = email => {
  return knex
    .table('users')
    .where({email})
    .first('*')
}

const getAllBooths = () => getRecords('vendor_booths').orderBy('id', 'asc')

const getBoothById = id => getRecordById('vendor_booths', id)

export default {
  getAllUsers,
  getAllBooths,
  getBoothById,
  getUserByEmail
}
