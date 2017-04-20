import express from 'express'

import map_routes from './map_routes'
import reserve_routes from './reserve_routes'

const router = new express.Router()

router.use('/map', map_routes)
router.use('/reserve', reserve_routes)

export default router
