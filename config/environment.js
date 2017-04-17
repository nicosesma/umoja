const path = require('path')

process.env.NODE_ENV = process.env.NODE_ENV
process.env.APP_ROOT = path.resolve(__dirname, '..')

if (process.env.NODE_ENV === 'development') {
  require('dotenv').load()
}
