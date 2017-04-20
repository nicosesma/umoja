import knex from './knex'

const getRecords = table => knex.table(table).select('*')

const getRecordById = (table, id) => {
  return knex
    .table(table)
    .where({id})
    .first('*')
}

const getAllUsers = () => getRecords('users')

const getAllVendorSpots = () => getRecords('vendor_spots')

const getVendorSpotById = id => getRecordById('vendor_spots', id)

export default {
  getAllUsers,
  getAllVendorSpots,
  getVendorSpotById
}
