var Clock = function(minutes) {
  this.minutes = minutes;
  this.seconds = 60;
  this.paused = true;
  this.togglePaused = function() {
    this.paused = !this.paused;
  };
  this.retrieveTime = function() {
    return this.minutes + ":" + this.seconds;
  };
  this.addAMinute = function() {
    this.minutes++;
  };
  this.minusAMinute = function() {
    if(this.minutes === 1) {
      return this.minutes;
    }
    this.minutes--;
  };
  this.countdown = function() {

  };
};

module.exports = Clock;
