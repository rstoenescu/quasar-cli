const
  fs = require('fs'),
  fse = require('fs-extra'),
  appPaths = require('../app-paths'),
  logger = require('../helpers/logger'),
  log = logger('app:mode-firebase'),
  warn = logger('app:mode-firebase', 'red'),
  spawn = require('../helpers/spawn')

function ensureNpmInstalled () {
  if (fs.existsSync(appPaths.resolve.firebase('node_modules'))) {
    return
  }

  log('Installing dependencies in /src-firebase')
  spawn.sync(
    'npm',
    [ 'install' ],
    appPaths.firebaseDir,
    () => {
      warn(`⚠️  [FAIL] npm failed installing dependencies in /src-firebase`)
      process.exit(1)
    }
  )
}

class Mode {
  get isInstalled () {
    return fs.existsSync(appPaths.firebaseDir)
  }

  add (target) {
    if (this.isInstalled) {
      warn(`Firebase support detected already. Aborting.`)
      return
    }



    const
      pkg = require(appPaths.resolve.app('package.json')),
      appName = pkg.productName || pkg.name || 'Quasar App'

    log('Creating Firebase source folder...')
    fse.copySync(appPaths.resolve.cli('templates/firebase'), appPaths.firebaseDir)
    log(`Firebase support was added`)

    spawn.sync(
      'firebase',
      ['login', '--interactive'],
      appPaths.firebaseDir,
      () => {
        warn(`⚠️  There was an error trying to install Firebase support`)
        process.exit(1)
      })

    let hmm = spawn.sync(
      'firebase',
      ['init'],
      appPaths.firebaseDir,
      (err) => {
        if(err.status !== 1){
          warn(`⚠️  There was an error trying to install Firebase support ${err}`)
          process.exit(1)
        }
        // Skipp error
        return false
      }
    )

    log(`Firebase support was installed`)

 }

  remove () {
    if (!this.isInstalled) {
      warn(`No Firebase support detected. Aborting.`)
      return
    }

    fse.removeSync(appPaths.firebaseDir)
    log(`Firebase support was removed`)
  }
}

module.exports = Mode
