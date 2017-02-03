var Clock = function(minutes) {
  this.minutes = minutes;
  this.seconds = 60;
  this.paused = true;

  this.togglePaused = function() {
    this.paused = !this.paused;
  };
  this.displayTime = function(minutes, seconds, element) {
    var element = document.getElementById(element);

    element.innerHTML = minutes + ":" + seconds;

    return this.minutes + ":" + this.seconds;
  };
  this.addAMinute = function() {
    this.minutes++;
    var time = document.getElementById("time");
    time.innerHTML = this.minutes;
  };
  this.minusAMinute = function() {
    if(this.minutes === 1) {
      return this.minutes;
    }
    this.minutes--;
    var time = document.getElementById("time");
    time.innerHTML = this.minutes;
  };
  this.switchConfigure = function(clock) {
    var minus = document.getElementById("minus");
    var plus = document.getElementById("plus");
    if(clock == "session") {

      minus.setAttribute("onclick", "session.minusAMinute()");
      plus.setAttribute("onclick", "session.addAMinute()");
      console.log(minus);
      console.log(plus);
    }
    else if(clock == "breaks"){

      minus.setAttribute("onclick", "breaks.minusAMinute()");
      plus.setAttribute("onclick", "breaks.addAMinute()");
      console.log(minus);
      console.log(plus);
    }
  }
  this.countdown = function() {
    var clock = this;
    var minutes = clock.minutes - 1;
    var seconds = clock.seconds;

    if(!clock.paused) {

      var countDown = setInterval(function() {
        if(clock.paused) {
          clearInterval(countDown);
        }
        if(minutes === 0 && seconds <= 1) {
          clock.togglePaused();
          clearInterval(countDown);
        }
        if(minutes <= 1) {
          minutes = 0;
        }
        if(seconds < 1) {
          minutes--;
          seconds = 60;
        }

        seconds--;

        clock.displayTime(minutes, seconds, "currentTime");
      }, 1000);
    }
  };
};

var session = new Clock(1);
var breaks = new Clock(2);


module.exports = Clock;
