import express from 'express'

import {commands, queries} from './database'

const router = new express.Router()

router.post('/', (request, response) => {
  console.log('In the login route API', request.body)
  response.json('In the auth route')
})

router.post('/create_user', (request, response) => {
  console.log('In the create user route')
  console.log('request.body', request.body)
  response.json('About to create a user')
})

export default router
