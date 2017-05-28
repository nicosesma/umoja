const defaultConfig = env => {
  const connectionString = (
    process.env.DATABASE_URL ||
    `postgres://${process.env.USER}@localhost:5432/umoja-${env}`
  )

  return {
    client: 'postgresql',
    connection: connectionString,
    migrations: {
      directory: __dirname + '/db/migrations',
      tableName: 'migrations'
    },
    seeds: {
      directory: __dirname + `/db/seeds/${env}`
    }
  }
}

module.exports = {
  development: defaultConfig('development'),
  production: defaultConfig('production'),
  test: defaultConfig('test')
}
