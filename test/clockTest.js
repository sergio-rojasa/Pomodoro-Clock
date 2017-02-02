var expect = require('chai').expect;
var Clock = require('../app/clock');

describe('Clock', function() {
  var clock = new Clock();

  describe('Constructor', function() {
    it('should have a minutes property', function() {
      expect(clock).to.have.property('minutes');
    });
    it('should have a seconds property equal to 60', function() {
      expect(clock).to.have.property('seconds').equal(60);
    });
    it('should have a addAMinute method', function() {
      expect(clock).to.have.property('addAMinute').be.a('function');
    });
    it('should have a minusAMinute method', function() {
      expect(clock).to.have.property('minusAMinute').be.a('function');
    })
  });
});
