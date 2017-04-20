import express from 'express'

import {commands, queries} from './database'

const router = new express.Router()

router.post('/', (request, response) => {
  response.json('In the auth route')
})

export default router
