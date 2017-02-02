var expect = require('chai').expect;
var Clock = require('../app/clock');

describe('Clock', function() {
  var clock = new Clock(25);

  describe('Constructor', function() {
    it('should have a minutes property equal to given parameter number.', function() {
      expect(clock).to.have.property('minutes').be.a('number').equal(25);
    });
    it('should have a seconds property equal to number 60.', function() {
      expect(clock).to.have.property('seconds').be.a('number').equal(60);
    });
    it('should hava a paused property equal to bolean true.', function() {
      expect(clock).to.have.property('paused').be.a('boolean').equal(true);
    })
    it('should have a togglePaused method.', function() {
      expect(clock).to.have.property('togglePaused').be.a('function');
    });
    it('should have a retrieveTime method.', function() {
      expect(clock).to.have.property('retrieveTime').be.a('function');
    });
    it('should have a addAMinute method', function() {
      expect(clock).to.have.property('addAMinute').be.a('function');
    });
    it('should have a minusAMinute method', function() {
      expect(clock).to.have.property('minusAMinute').be.a('function');
    });
    it('should have a countdown method', function() {
      expect(clock).to.have.property('countdown').be.a('function');
    });
  });

  describe('#togglePaused', function() {
    it('should toggle paused to equal false', function() {
      clock.togglePaused();
      expect(clock).to.have.property('paused').equal(false);
    });
  });

  describe('#retrieveTime', function() {
    clock.minutes = 25;
    var time = "25:60";
    it('should retrieve 25:60 when retrieveTime is involked.', function() {
      expect(clock.retrieveTime()).to.equal(time);
    });
  });

  describe('#addAMinute', function() {
    it('should add a minute to minutes property', function() {
      clock.minutes = 25;
      clock.addAMinute();
      expect(clock).to.have.property('minutes').equal(26);
    });
  });

  describe('#subtractAMinute', function() {
    it('should minus a minute to minutes property', function() {
      clock.minutes = 25;
      clock.minusAMinute();
      expect(clock).to.have.property('minutes').equal(24);
    });
    it('should not subtract a minute if minute is equal to 1',function() {
      clock.minutes = 1;
      clock.minusAMinute();
      expect(clock).to.have.property('minutes').equal(1);
    });
  })
});
