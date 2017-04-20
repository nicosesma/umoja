require('../../config/environment') // Relative to build directory

import express from 'express'
import enforce from 'express-sslify'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

import HTTP from 'http'
import fs from 'fs'
import path from 'path'

import apiRoutes from './api'
import authRoutes from './auth_routes'
import errorHandlers from './error_handlers'

import defaultConfig from '../../config'

const buildPath = path.join(__dirname, '..')

const server = express()

server.set('env', process.env.NODE_ENV)

console.log('defaultConfig', defaultConfig)

// const {COOKIE_LIFETIME, SESSION_KEY} = defaultConfig
//
// server.use(cookieSession({
//   name: 'session',
//   keys: [defaultConfig.SESSION_KEY],
//   maxAge: defaultConfig.COOKIE_LIFETIME
// }))

server.use(express.static(`${buildPath}/public`))
server.use(bodyParser.json())

server.use('/', authRoutes)
server.use('/api', apiRoutes)


server.get('/*', (request, response) => {
  response.sendFile(`public/index.html`, {root: path.resolve(__dirname, '..')})
})

server.use(errorHandlers)

// server.use(enforce.HTTPS({trustProtoHeader: true}))

server.start = (port, callback) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Started server at http://localhost:${port}`)
  }

  server.set('port', port)
  console.log('port', port)

  const httpServer = HTTP.createServer(server)
  httpServer.listen(port, callback)

  return httpServer
}

export default server
