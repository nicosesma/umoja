import express from 'express'

import {commands, queries} from './database'

import config from '../../config' // Relative to build

const router = new express.Router()

router.post('/', (request, response) => {
  const {user} = request.session

  if (user) {
    const session_user_id = user.id

    return queries.getUserByEmail(user.email)
      .then(verified_user => {
        const user_attributes = Object.assign({}, {
          id: verified_user.id,
          name: verified_user.name,
          email: verified_user.email,
          admin: verified_user.admin,
          organization: verified_user.organization,
        })

        const user_can_reserve = verified_user.can_reserve

        const two_booths = verified_user.two_spots

        console.log('verified_user /auth_routes', verified_user)

        if (user.id === verified_user.id) {
          console.log('verified_user', verified_user)
          response.json({
            user_attributes,
            user_can_reserve,
            two_booths
          })
        } else {
          response.json(null)
        }
      })
  }

  if (!user) {
    response.json(null)
  }
})

router.post('/login', (request, response) => {
  console.log('In the login route API', request.body)
  return commands.verifyUserLogin(request.body)
    .then(result => {
      if (result) {
        request.session.user = result
        console.log('result LoginAPIRoute query', result)
        const user_attributes = Object.assign({}, {
          id: result.id,
          name: result.name,
          email: result.email,
          admin: result.admin,
          organization: result.organization,
        })
        const user_can_reserve = result.can_reserve

        const two_booths = result.two_spots

        response.json({
          user_attributes,
          user_can_reserve,
          two_booths
        })
      } else {
        console.log('result negativeLogin API', result)
        response.json(null)
      }
    })
})

router.post('/create_user', (request, response) => {
  const {new_user_attributes, invite_code} = request.body
  const {access_invite_one, access_invite_two, admin_invite} = config

  if (invite_code === access_invite_one) {
    return createNewUser(new_user_attributes)
      .then(user => {
        request.session.user = user
        response.json(user)
      })
  }
  if (invite_code === access_invite_two) {
    Object.assign(new_user_attributes, {two_spots: true})
    return createNewUser(new_user_attributes)
      .then(user => {
        request.session.user = user
        response.json(user)
      })
  }
  if (invite_code === admin_invite) {
    Object.assign(new_user_attributes, {admin: true})
    return createNewUser(new_user_attributes)
      .then(user => {
        request.session.user = user
        response.json(user)
      })
  }
  if (invite_code === 'test') {
    return createNewUser(new_user_attributes)
      .then(user => {
        request.session.user = user
        response.json(user)
      })
  }

  response.json(null)
})

router.post('/signout', (request, response) => {
  delete request.session.user
  response.json(null)
})

const createNewUser = attributes => {
  return queries.getUserByEmail(attributes.email)
    .then(result => {
      if (!result) {
        return commands.createUser(attributes)
          .then(user => user)
      }

      return null
    })
}

export default router
