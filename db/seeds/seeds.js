exports.seed = knex => {
  return Promise.all([
    knex.truncate('users'),
    knex.truncate('vendor_spots')
  ])

  const createVendorSpots = () => {
    for (i = 0; i < 55; i++) {
      knex
        .insert({})
        .into('vendor_spots')
        .returning('*')
    }
    return;
  }
}
