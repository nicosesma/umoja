import express from 'express'

import {commands, queries} from '../database'

const router = new express.Router()

router.post('/', (request, response) => {
  console.log('request.body /reserve', request.body)
  console.log('request.session.user', request.session.user)
  // const {user} = request.session
  if (request.session.user) {
    const {id} = request.session.user

    const reservation_attributes = Object.assign({}, request.body, {user_id: id})

    return queries.getUserById(id)
      .then(user => {
        console.log('user db /reserve', user)

        if (!user.can_reserve) {
          console.log('In the null route for /reserve')
          return response.json(null)
        }

        if (user.two_spots) {
          return queries.getBoothsByUserId(user.id)
            .then(booths => {
              console.log('booths 000', booths)
              if (booths.length === 0) {
                return commands.manageBoothReservation(JSON.parse(request.body.id), reservation_attributes)
                  .then(reservation => response.json({reservation, user_id: user.id, user_can_reserve: true}))
              } else {
                console.log('made it into second statement')
                return commands.updateUser(user.id, {can_reserve: false})
                  .then(_ => {
                    return commands.manageBoothReservation(JSON.parse(request.body.id), reservation_attributes)
                      .then(reservation => response.json({reservation, user_id: user.id, user_can_reserve: false}))
                  })
              }
            })
        }

        if (user.can_reserve && !user.two_spots) {
          return commands.updateUser(user.id, {can_reserve: false})
            .then(_ => {
              return commands.manageBoothReservation(JSON.parse(request.body.id), reservation_attributes)
                .then(reservation => response.json({reservation, user_id: user.id, user_can_reserve: false}))
            })
        }
      })
  }
  // console.log('NUlling it in /map')
  response.json(null)
})

router.post('/cancel', (request, response) => {
  console.log('In the reservation_cancel route API', request.body, request.session.user)

  return queries.getBoothById(JSON.parse(request.body.id))
    .then(result => {
      console.log('result cancel Query', result, request.session.user.id)
      const {user} = request.session

      if (result.user_id === user.id && !request.body.reserved && result.reserved) {
        return commands.updateUser(user.id, {can_reserve: true}).then(_ => {
          const cancellation_attributes = Object.assign({}, request.body, {user_id: null})

          return commands.manageBoothReservation(JSON.parse(request.body.id), cancellation_attributes)
            .then(canceled_reservation => {
              console.log('canceled_reservation', canceled_reservation)
              response.json({canceled_reservation, user_can_reserve: true})
            })
        })
      }

      response.json(null)
    })
})

export default router
