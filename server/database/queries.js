import knex from './knex'

import bcrypt from 'bcrypt'

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

const verifyUserLogin = attributes => {
  console.log('attributes verifyUser DB', attributes)
  return getUserByEmail(attributes.email)
    .then(user => {
      if (user) {
        return bcrypt.compare(attributes.password, user.password)
          .then(result => {
            return result ? user : null
          })
      }

      return 'Not a user'
    })
}

const getAllVendorSpots = () => getRecords('vendor_spots').orderBy('id', 'asc')

const getVendorSpotById = id => getRecordById('vendor_spots', id)

export default {
  getAllUsers,
  getAllVendorSpots,
  getVendorSpotById,
  getUserByEmail,
  verifyUserLogin
}
