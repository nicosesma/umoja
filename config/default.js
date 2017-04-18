require('./environment')

module.exports = {
  APP_ROOT: process.env.APP_ROOT,
  COOKIE_LIFETIME: (1000 * 60 * 60 * 24),
  SESSION_KEY: process.env.SESSION_KEY
}
