import express from 'express'

const router = new express.Router()

// catch 404 and forward to error_handler
router.use((request, response, next) => {
  console.log('request', request)
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

if (process.env.NODE_ENV === 'development') {
  // Development error handler
  router.use((error, request, response, next) => {
    response.status(error.status || 500)
    response.json({
      message: error.message,
      error: error,
      stack: error.stack
    })
  })
} else {
  // Production error handler
  router.use((error, response, request, next) => {
    response.status(error.status || 500)
    response.json({
      message: error.message,
      error: {},
      stack: []
    })
  })
}

export default router
