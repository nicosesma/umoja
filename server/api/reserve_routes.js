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

    return commands.manageBoothReservation(JSON.parse(request.body.id), reservation_attributes).then(reservedSpot => {
      console.log('reservedSpot', reservedSpot)
      response.json(reservedSpot)
    })
  }
  response.json('About to reserve but can\'t')
})

router.post('/cancel', (request, response) => {
  console.log('In the reservation_cancel route API', request.body, request.session.user)

  return queries.getBoothById(JSON.parse(request.body.id))
    .then(result => {
      console.log('result cancel Query', result, request.session.user.id)
      const {user} = request.session
      if (result.user_id === user.id && !request.body.reserved && result.reserved) {
        const cancellation_attributes = Object.assign({}, request.body, {user_id: user.id})
        return commands.manageBoothReservation(JSON.parse(request.body.id), cancellation_attributes)
          .then(canceled_reservation => {
            console.log('canceled_reservation', canceled_reservation)
            response.json(canceled_reservation)
          })
      }
      response.json('Wrong User Id')
    })
})

export default router
