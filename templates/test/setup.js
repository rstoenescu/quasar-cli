// setup JSDOM
require('jsdom-global')()

// make expect available globally
// global.expect = require('expect')
global.expect = require('chai').expect
global.sinon = require('sinon')
