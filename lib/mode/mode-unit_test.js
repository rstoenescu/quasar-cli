const
  fs = require('fs'),
  fse = require('fs-extra'),
  appPaths = require('../build/app-paths'),
  logger = require('../helpers/logger'),
  log = logger('app:mode-unit_test'),
  warn = logger('app:mode-unit_test', 'red'),
  spawn = require('../helpers/spawn')

const
  electronDeps = {
    'webpack-node-externals': '^1.6.0',
    'vue-server-renderer': '^2.5.15',
    'nyc': '^11.4.1',
    'mocha': '^4',
    'mocha-loader': '^1.1.3',
    'mocha-webpack': '^1.0.1',
    'jsdom': '^11.6.2',
    'jsdom-global': '^3.0.2',
    'expect': '^22.4.0',
    'cross-env': '^5.1.4',
    'chai': '^4.1.2',
    'babel-plugin-coverage': '^1.0.0',
    '@vue/test-utils': '^1.0.0-beta.11'
  }

class Mode {
  get isInstalled () {
    return fs.existsSync(appPaths.unit_testDir)
  }

  add (params) {
    if (this.isInstalled) {
      warn(`Unit-test support detected already. Aborting.`)
      return
    }

    log(`Installing Unit-test dependencies...`)
    spawn.sync(
      'npm',
      ['install', '--save-dev', '--save-exact'].concat(Object.keys(electronDeps).map(dep => {
        return `${dep}@${electronDeps[dep]}`
      })),
      appPaths.appDir,
      () => warn('Failed to install Electron dependencies')
    )

    log(`Creating Electron source folder...`)
    fse.copySync(appPaths.resolve.cli('templates/electron'), appPaths.electronDir)
    log(`Electron support was added`)
  }

  remove () {
    if (!this.isInstalled) {
      warn(`No Electron support detected. Aborting.`)
      return
    }

    log(`Removing Electron source folder`)
    fse.removeSync(appPaths.electronDir)

    log(`Uninstalling Electron dependencies...`)
    spawn.sync(
      'npm',
      ['uninstall', '--save-dev'].concat(Object.keys(electronDeps)),
      appPaths.appDir,
      () => warn('Failed to uninstall Electron dependencies')
    )

    log(`Electron support was removed`)
  }
}

module.exports = Mode
