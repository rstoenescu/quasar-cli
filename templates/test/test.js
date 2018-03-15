let expect = require('chai').expect

// here are a few examples of a simple math test

describe('#Schroedinger\'s Concat', function() {
  it('must add', function() {
    let result = 4 + 2
    expect(result).to.equal(6)
  })
  it('must concat, not do math', function() {
    let result = 4 + '2'
    expect(result).to.equal('42')
  })
  it('must concat, not do math', function() {
    let result = '4' + 2
    expect(result).to.equal('42')
  })
  it('must not add decimals correctly', function() {
    let result = .4 + .02
    expect(result).not.to.equal('.42')
  })
  it('NaN is not NaN', function() {
    let answer = NaN
    expect(typeof(answer)).to.equal('number')
  })
  it('must throw an error when splitting a number', function() {
    // catching errors is a bit more complicated
    let result = 42
    try {
      expect(() => result.split('2')).not.to.throw(Error)
    }
    catch (err) {
      expect(() => result.split('2')).to.throw(Error)
    }
  })
})

var assert = require('chai').assert;

function add() {
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  }, 0);
}

describe('add()', function() {
  var tests = [
    {args: [1, 2],       expected: 3},
    {args: [1, 2, 3],    expected: 6},
    {args: [1, 2, 3, 4], expected: 10}
  ];

  tests.forEach(function(test) {
    it('correctly adds ' + test.args.length + ' args', function() {
      var res = add.apply(null, test.args);
      assert.equal(res, test.expected);
    });
  });
});
