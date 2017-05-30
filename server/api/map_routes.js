import express from 'express'

import {commands, queries} from '../database'

const router = new express.Router()

router.post('/', (request, response) => {
  console.log('in request /map')
  return queries.getAllBooths().then(vendorMap => {
    console.log('vendorMap', request.session)
    response.json(vendorMap)
  })
})

export default router
