process.env.NODE_ENV = 'test'
process.env.PORT = '3333'
process.env.SESSION_KEY = 'test_key_for_session'

import chai, {expect} from 'chai'
import chaiHTTP from 'chai-http'

import {knex, commands, queries} from '../server/database'

chai.use(chaiHTTP)

beforeEach(() => {
  return knex.migrate.latest().then(() => knex.truncateAllTables())
})

module.exports = {
  chai,
  expect,
  knex,
  commands,
  queries
}
