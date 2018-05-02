const
  fs = require('fs'),
  fse = require('fs-extra'),
  appPaths = require('../build/app-paths'),
  logger = require('../helpers/logger'),
  log = logger('app:mode-test'),
  warn = logger('app:mode-test', 'red'),
  spawn = require('../helpers/spawn'),
  resolveGlobal = require('resolve-global')

const
  testDeps = {
    "@vue/test-utils": "^1.0.0-beta.15",
    "@babel/core": "7.0.0-beta.46",
    "babel-loader": "8.0.0-beta.2",
//    "babel-plugin-coverage": "^1.0.0",
//    "babel-plugin-istanbul": "^4.1.5",
    "@babel/preset-env": "7.0.0-beta.46",
    "chai": "^4.1.2",
    "chrome-launcher": "^0.10.2",
    "cross-env": "^5.0.5",
    "css-loader": "0.28.10",
    "expect": "^21.2.1",
    "file-loader": "1.1.11",
    "fs": "^0.0.1-security",
    "istanbul-instrumenter-loader": "^3.0.0",
    "jest": "^22.4.3",
    "jsdom": "^11.6.2",
    "jsdom-global": "^3.0.2",
    "mocha": "^4",
    "mocha-loader": "^1.1.3",
    "mocha-webpack": "^2.0.0-beta.0",
    "nyc": "^11.4.1",
    "quasar-extras": "1.0.2",
    "quasar-framework": "0.15.7",
    "sinon": "4.5.0",
    "sinon-chai": "^3.0.0",
    "vue": "2.5.16",
    "vue-loader": "14.2.1",
    "vue-server-renderer": "^2",
    "vue-template-compiler": "2.5.16",
    "webpack": "4.6.0",
    "webpack-dev-server": "3.1.3",
    "webpack-node-externals": "^1.6.0"
  }

if (resolveGlobal.silent('cypress') === null) {
  // we check if it is globally installed to make the install faster and footprint smaller
  // todo: is this a problem for CI ?
  // todo: should we be using it programmatically instead ?
  testDeps["cypress"] = "^2.1.0"
}
if (resolveGlobal.silent('lighthouse') === null) {
  // we check if it is globally installed to make the install faster and footprint smaller
  // todo: is this a problem for CI ?
  // todo: should we be using it programmatically instead ?
  testDeps["lighthouse"] = "^2.9.4"
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
    fse.copySync(appPaths.resolve.cli('templates/test/test'), appPaths.testDir)
    fse.copySync(appPaths.resolve.cli('templates/test/cwd/QBtn-demo.vue'), appPaths.srcDir+'/components/QBtn-demo.vue')
    fse.copySync(appPaths.resolve.cli('templates/test/cwd/.babelrc.test'), appPaths.appDir+'/.babelrc.test')
    fse.copySync(appPaths.resolve.cli('templates/test/cwd/.nycrc'), appPaths.appDir+'/.nycrc')
    fse.copySync(appPaths.resolve.cli('templates/test/cwd/cypress.json'), appPaths.appDir+'/cypress.json')
    fse.copySync(appPaths.resolve.cli('templates/test/cwd/mocha-webpack.opts'), appPaths.appDir+'/mocha-webpack.opts')

    log(`
    Unit Test and Integration Testing support has been added.
    
    Run "quasar test -u" to see watched unit testing.
    Run "quasar test -c" to see code coverage.
    Run "quasar test -e" to see e2e.
    Run "quasar test -l" to see code quality.
    
    Run "quasar dev mode -m test" to have tested files watched AND your dev server.`)
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
