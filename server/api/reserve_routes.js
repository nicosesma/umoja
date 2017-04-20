import express from 'express'

import {commands, queries} from '../database'

const router = new express.Router()

router.post('/', (request, response) => {
  console.log('request.body /reserve', request.body)
  const {id, reserved, contact_name, contact_email, contact_number} = request.body
  const attributes = {
    contact_name,
    contact_email,
    contact_number,
    reserved
  }

  return commands.reserveVendorSpot(JSON.parse(id), attributes).then(reservedSpot => {
    console.log('reservedSpot', reservedSpot)
    response.json(reservedSpot)
  })
})

export default router
