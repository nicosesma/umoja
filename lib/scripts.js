const fs = require('fs')
const path = require('path')
const {spawn, exec} = require('child-process-promise')
const rmdir = require('rmdir')

process.chdir(path.resolve(__dirname, '..'))

const bin = './node_modules/.bin'

const builder = (name, buildCommand) => {
  return watch => {
    const [cmd, ...args] = buildCommand(watch)
    return spawn(cmd, args, {stdio: 'inherit'})
      .catch(error => {
        console.log(`${name}:error`, error)
        throw error
      })
  }
}

const buildServer = builder('buildServer', watch =>
  watch
    ? [`${bin}/babel`, './server', '--out-dir', './build/server', '--watch']
    : [`${bin}/babel`, './server', '--out-dir', './build/server']
)

const buildBrowser = builder('buildBrowser', watch =>
  watch
    ? [`${bin}/babel`, './client', '--out-dir', './build/client', '--watch']
    : [`${bin}/babel`, './client', '--out-dir', './build/client']
)

const buildWebpack = builder('buildWebpack', watch =>
  watch
    ? [`${bin}/webpack`, '--watch']
    : [`${bin}/webpack`]
)

const buildTest = builder('buildTest', watch =>
  watch
    ? [`${bin}/babel`, './test', '--out-dir', './build/test', '--watch']
    : [`${bin}/babel`, './test', '--out-dir', './build/test']
)

const rmBuildDir = () => {
  console.log('removing build directory')

  return new Promise((resolve, reject) => {
    rmdir('./build', error => {
      if (error && !error.message.includes('ENOENT')) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

const buildAll = ({
  production: () => {
    return Promise.all([
      buildBrowser(),
      buildServer()
    ])
  },
  development: watch => {
    return Promise.all([
      buildBrowser(watch),
      buildServer(watch),
      buildTest(watch),
      buildWebpack(watch)
    ])
  },
  test: watch => {
    return Promise.all([
      buildBrowser(watch),
      buildServer(watch),
      buildTest(watch),
      buildWebpack(watch)
    ])
  }
})[process.env.NODE_ENV]

const waitForFileToExist = (path, callback) => {
  return fs.lstat(path, (error, stats) => {
    if (stats) {
      callback()
    } else {
      waitForFileToExist()
    }
  })
}

const delay = (milliseconds) =>
  new Promise(resolve =>
    setTimeout(resolve, milliseconds)
  )

const start = {
  production: () => {
    return spawn('node', ['./build/server'], {stdio: 'inherit'})
  },
  development: () => {
    buildAll(true)

    return delay(1000).then(() => {
      return waitForFileToExist('./build/server/index.js', () => {
        return spawn('nodemon', ['./build/server', '--watch', './build/server'], {stdio: 'inherit'})
      })
    })
  },
  test: () => {
    return spawn('node', ['./build/server'], {stdio: 'inherit'})
  }
}[process.env.NODE_ENV]

const _test = watch => {
  const args = ['--recursive', './build/test']
  if (watch) {
    args.unshift('--watch')
  }

  return spawn(`${bin}/mocha`, args, {stdio: 'inherit'})
}

const test = {
  production: () => {
    console.warn('You can not run tests in production')
    process.exit(1)
  },
  development: () => {
    const watch = args.includes('-w') || args.includes('--watch')

    return _test(watch)
  },
  test: () => {
    return buildAll(false).then(() => {
      return _test(false)
    })
  }
}[process.env.NODE_ENV]

const fail = error => {
  process.exit(error.code)
}

const raiseErrors = proc => {
  return (...args) => proc.apply(null, args).catch(fail)
}

module.exports = {
  buildAll: raiseErrors(buildAll),
  buildBrowser: raiseErrors(buildBrowser),
  buildServer: raiseErrors(buildServer),
  buildWebpack: raiseErrors(buildWebpack),
  start: raiseErrors(start),
  test: raiseErrors(test)
}
