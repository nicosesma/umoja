import express from 'express'

import {commands, queries} from '../database'

const router = new express.Router()

router.post('/', (request, response) => {
  const {user} = request.session

  if (request.session.user) {
    return queries.getAllBooths()
      .then(vendorMap => {
        return queries.getBoothsByUserId(user.id)
          .then(user_booths => {
            if (user_booths) {
              console.log('user_booths', user_booths.length)
              if (user_booths.length === 1) {
                user.two_spots
                  ? response.json({vendorMap, user_can_reserve: true})
                  : response.json({vendorMap, user_can_reserve: false})
              } else {
                response.json({vendorMap})
              }
            } else {
              response.json({vendorMap})
            }
          })
      })
  } else {
    response.json(null)
  }
})

export default router
