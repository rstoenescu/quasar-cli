const
  fs = require('fs'),
  fse = require('fs-extra'),
  appPaths = require('../build/app-paths'),
  logger = require('../helpers/logger'),
  log = logger('app:mode-unit_test'),
  warn = logger('app:mode-unit_test', 'red')

class Mode {
  get isInstalled () {
    return fs.existsSync(appPaths.unit_testDir)
  }

  add (params) {
    if (this.isInstalled) {
      warn(`Unit-test support detected already. Aborting.`)
      return
    }

    log(`Creating Unit-test source folder...`)
    fse.copySync(appPaths.resolve.cli('templates/unit_test'), appPaths.unit_testDir)
    log(`Unit-test support was added`)
  }

  remove () {
    if (!this.isInstalled) {
      warn(`No Unit-test support detected. Aborting.`)
      return
    }

    log(`Removing Unit-test source folder`)
    fse.removeSync(appPaths.unit_testDir)
    log(`PWA support was removed`)
  }
}

module.exports = Mode
