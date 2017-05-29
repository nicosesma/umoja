import express from 'express'

import {commands, queries} from './database'

import config from '../../config' // Relative to build

const router = new express.Router()

router.post('/', (request, response) => {
  console.log('In the login route API', request.body)
  return queries.verifyUserLogin(request.body)
    .then(result => {
      console.log('result LoginAPIRoute query', result)
      response.json(result)
    })
  // response.json('About to login')
})

router.post('/create_user', (request, response) => {
  console.log('In the create user route')
  const {new_user_attributes, invite_code} = request.body
  const {access_invite_one, access_invite_two, admin_invite} = config

  if (invite_code === access_invite_one) {
    return createNewUser(new_user_attributes)
      .then(user => response.json(user))
  }
  if (invite_code === access_invite_two) {
    Object.assign(new_user_attributes, {two_spots: true})
    return createNewUser(new_user_attributes)
      .then(user => response.json(user))
  }
  if (invite_code === admin_invite) {
    Object.assign(new_user_attributes, {admin: true})
    return createNewUser(new_user_attributes)
      .then(user => response.json(user))
  }

  response.json('Invalid Invite Code')
})

const createNewUser = attributes => {
  return queries.getUserByEmail(attributes.email)
    .then(result => {
      if (!result) {
        return commands.createUser(attributes)
          .then(user => user)
      }
      return 'User with this email already exists'
    })
}

export default router
