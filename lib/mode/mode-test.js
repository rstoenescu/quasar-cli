const
  fs = require('fs'),
  fse = require('fs-extra'),
  appPaths = require('../build/app-paths'),
  logger = require('../helpers/logger'),
  log = logger('app:mode-test'),
  warn = logger('app:mode-test', 'red'),
  spawn = require('../helpers/spawn')

const
  testDeps = {
    'vue': '^2',
    '@vue/test-utils': '^1.0.0-beta.11',
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
    'babel-plugin-coverage': '^1.0.0'
  }

class Mode {
  get isInstalled () {
    return fs.existsSync(appPaths.testDir)
  }

  add (params) {
    if (this.isInstalled) {
      warn(`Test support detected. Aborting.`)
      return
    }

    log(`Installing Test dependencies...`)
    spawn.sync(
      'yarn',
      ['add', '--dev', '--exact'].concat(Object.keys(testDeps).map(dep => {
        return `${dep}@${testDeps[dep]}`
      })),
      appPaths.appDir,
      () => warn('Failed to install Unit Test dependencies')
    )

    log(`Creating Unit Test source folder...`)
    fse.copySync(appPaths.resolve.cli('templates/test'), appPaths.testDir)
    log(`Unit Test support was added`)
  }

  remove () {
    if (!this.isInstalled) {
      warn(`No Unit Test support detected. Aborting.`)
      return
    }

    log(`Removing Unit Test source folder`)
    fse.removeSync(appPaths.testDir)

    log(`Uninstalling Unit Test dependencies...`)
    spawn.sync(
      'yarn',
      ['remove', '--dev'].concat(Object.keys(testDeps)),
      appPaths.appDir,
      () => warn('Failed to uninstall Unit Test dependencies')
    )

    log(`Unit Test support was removed`)
  }
}

module.exports = Mode
