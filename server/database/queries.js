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

const getUserById = id => getRecordById('users', id)

const getAllBooths = () => getRecords('vendor_booths').orderBy('id', 'asc')

const getBoothById = id => getRecordById('vendor_booths', id)

const getBoothsByUserId = user_id => {
  return knex
    .table('vendor_booths')
    .where({user_id})
    .first('*')
}

export default {
  getAllUsers,
  getAllBooths,
  getBoothById,
  getUserByEmail,
  getUserById,
  getBoothsByUserId
}
