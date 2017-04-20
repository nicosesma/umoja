import knex from './knex'
import queries from './queries'

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

const createUser = attributes => createRecord('users', attributes)

const updateUser = (id, attributes) => updateRecord('users', id, attributes)

const deleteUser = id => deleteRecord('users', id)

const reserveVendorSpot = (id, attributes) => {
  Object.assign(
    attributes,
    {updated_at: knex.fn.now()}
  )

  return updateRecord('vendor_spots', id, attributes)
}

export default {
  createUser,
  updateUser,
  deleteUser,
  reserveVendorSpot
}
