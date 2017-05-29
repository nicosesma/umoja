require('./environment')

module.exports = {
  APP_ROOT: process.env.APP_ROOT,
  COOKIE_LIFETIME: (1000 * 60 * 60 * 24),
  SESSION_KEY: process.env.SESSION_KEY,
  access_invite_one: 'not_so_secret_code',
  access_invite_two: 'not_so_secret_code_either',
  admin_invite: 'more_clever_passcode'
}
