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
    "@vue/test-utils": "^1.0.0-beta.12",
    "babel-core": "6.26.0",
    "babel-loader": "7.1.4",
    "babel-plugin-coverage": "^1.0.0",
    "babel-plugin-istanbul": "^4.1.5",
    "babel-preset-env": "1.6.1",
    "chai": "^4.1.2",
    "cross-env": "^5.0.5",
    "css-loader": "0.28.10",
    "expect": "^21.2.1",
    "file-loader": "1.1.11",
    "istanbul-instrumenter-loader": "^3.0.0",
    "jsdom": "^11.6.2",
    "jsdom-global": "^3.0.2",
    "mocha": "^3.5.3",
    "mocha-loader": "^1.1.3",
    "mocha-webpack": "^1.0.1",
    "nyc": "^11.4.1",
    "quasar-extras": "1.0.2",
    "quasar-framework": "0.15.7",
    "sinon": "4.5.0",
    "vue": "2.5.16",
    "vue-loader": "14.2.1",
    "vue-server-renderer": "^2",
    "vue-template-compiler": "2.5.16",
    "webpack": "3.11.0",
    "webpack-dev-server": "2.11.1",
    "webpack-node-externals": "^1.6.0"
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
    log(`Creating NYC Output folder...`)
    if (!fs.existsSync('.nyc_output')){
      fs.mkdirSync('.nyc_output');
    }
    log(`Unit Test and Integration Testing support has been added.`)
    log(`Run "quasar test" to see watched unit testing.`)
    log(`Run "quasar test --cover" to see code coverage.`)
    log(`Run "quasar dev mode -m test" to have tested files watched AND your dev server.`)
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
