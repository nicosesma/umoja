import express from 'express'

import reserve_routes from './reserve_routes'

const router = new express.Router()

router.use('/reserve', reserve_routes)

export default router
