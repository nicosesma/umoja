import express from 'express'

import {commands, queries} from '../database'

const router = new express.Router()

router.post('/', (request, response) => {
  const {user} = request.session
  console.log('request.session.user', request.session.user)
  if (request.session.user) {
    return queries.getAllBooths()
      .then(vendorMap => {
        return queries.getBoothsByUserId(user.id)
          .then(user_booths => {
            console.log('user_booths', user_booths.length)
            if (user_booths.length === 1) {
              user.two_spots
                ? response.json({vendorMap, user_can_reserve: true})
                : response.json({vendorMap, user_can_reserve: false})
            } else if (user_booths.length === 0) {
              console.log('In the user_booth length==== 0')
              response.json({vendorMap, user_can_reserve: true})
            } else if (user_booths.length === 2) {
              response.json({vendorMap, user_can_reserve: false})
            } else {
              response.json({vendorMap, user_can_reserve: false})
            }
          })
      })
  } else {
    console.log('In the null route /map')
    response.json(null)
  }
})

router.post('/user_reservations', (request, response) => {
  console.log('In the /user_reservations route')
  const {user} = request.session
  if (user) {
    return queries.getBoothsByUserId(user.id)
      .then(booths => {
        console.log('booths HomePAge API route', booths)
        response.json(booths)
      })
  } else {
    response.json(null)
  }
})

export default router
