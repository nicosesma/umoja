import knex from './knex'
import queries from './queries'

import bcrypt from 'bcrypt'

const firstRecord = records => records[0]

const createRecord = (table, attributes) => {
  return knex
    .table(table)
    .insert(attributes)
    .returning('*')
    .then(firstRecord)
}

const updateRecord = (table, id, attributes) => {
  return knex
    .table(table)
    .where({id})
    .update(attributes)
    .returning('*')
    .then(firstRecord)
}

const deleteRecord = (table, id) => {
  return knex
    .table(table)
    .where({id})
    .del()
}

const createUser = attributes => {
  console.log('in createUser', attributes)
  const saltRounds = 10
  return bcrypt.hash(attributes.password, saltRounds)
    .then(hash => {
      console.log('hash result', hash)
      Object.assign(attributes, {password: hash})
      return createRecord('users', attributes)
    })
}

const verifyUserLogin = attributes => {
  console.log('attributes verifyUser DB', attributes)
  return queries.getUserByEmail(attributes.email)
    .then(user => {
      if (user) {
        return bcrypt.compare(attributes.password, user.password)
          .then(result => {
            return result ? user : null
          })
      }

      return null
    })
}

const updateUser = (id, attributes) => updateRecord('users', id, attributes)

const deleteUser = id => deleteRecord('users', id)

const manageBoothReservation = (id, attributes) => {
  Object.assign(
    attributes,
    {updated_at: knex.fn.now()}
  )

  return updateRecord('vendor_booths', id, attributes)
}

export default {
  createUser,
  updateUser,
  deleteUser,
  manageBoothReservation,
  verifyUserLogin
}
