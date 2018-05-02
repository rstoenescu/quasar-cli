// setup JSDOM
require('jsdom-global')()

const chai = require('chai')

// make expect available globally
global.expect = chai.expect
global.assert = chai.assert

global.sinon = require('sinon')
global.jest = require('jest')
