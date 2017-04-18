require('../../config/environment') // Relative to build path

import server from './server'

server.start(process.env.PORT || '6000')
