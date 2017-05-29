import express from 'express'

import {commands, queries} from '../database'

const router = new express.Router()

router.post('/', (request, response) => {
  console.log('request.body /reserve', request.body)
  console.log('request.session.user', request.session.user)
  const {user} = request.session
  if (user) {
    const {id} = user
    console.log('user reserveRoute', user, id)
    // response.json('Going to reserve spot', request.body)
    const reservation_attributes = Object.assign({}, request.body, {user_id: id})
    console.log('reservation_attributes', reservation_attributes)

    return commands.reserveVendorSpot(JSON.parse(request.body.id), reservation_attributes).then(reservedSpot => {
      console.log('reservedSpot', reservedSpot)
      response.json(reservedSpot)
    })
  }
  response.json('About to reserve but can\'t')
})

export default router
