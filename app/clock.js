var Clock = (function() {
  function Clock(minutes) {
    this.minutes = minutes;
  };

  Clock.prototype.minutes = {
    session: 25,
    breaks: 5
  };
  Clock.prototype.seconds = 60;
  Clock.prototype.paused = true;
  Clock.prototype.power = false;

  Clock.prototype.init = function() {
    this.power = true;
    this.displayTime(this.minutes, "currentTime");
    this.displayTime(this.minutes, "configureTime");

  };
  Clock.prototype.displayTime = function(time, element) {
    var element = document.getElementById(element);
    element.innerHTML = time;
  };
  Clock.prototype.togglePaused = function() {
    this.paused = !this.paused;
  };
  Clock.prototype.addAMinute = function() {
    if(this.paused) {
      this.minutes++;
      this.seconds = 0;

      if(this.power == true) {
        this.displayTime(this.minutes, "currentTime");
      }
      this.displayTime(this.minutes, "configureTime");
    }

  };
  Clock.prototype.minusAMinute = function() {
    if(this.paused) {
      if(this.minutes === 1) {
        return this.minutes;
      }
      this.minutes--;
      this.seconds = 0;

      if(this.power == true) {
        this.displayTime(this.minutes, "currentTime");
      }
      this.displayTime(this.minutes, "configureTime");
    }

  };
  Clock.prototype.switchConfigure = function(clock) {
    var minus = document.getElementById("minus");
    var plus = document.getElementById("plus");
    var session = document.getElementById("session");
    var breaks = document.getElementById("break");

    if(clock == "session") {
      minus.setAttribute("onclick", "session.minusAMinute()");
      plus.setAttribute("onclick", "session.addAMinute()");

      session.setAttribute("style", "background-color: #00cf9e; color: #f9f9f9;");
      breaks.setAttribute("style", "background-color: #f9f9f9; color: #00cf9e; border: 5px solid #00cf9e;");

      this.displayTime(this.minutes, "configureTime");
    }
    else if(clock == "breaks") {
      minus.setAttribute("onclick", "breaks.minusAMinute()");
      plus.setAttribute("onclick", "breaks.addAMinute()");

      session.setAttribute("style", "background-color: #f9f9f9; color: #00cf9e; border: 5px solid #00cf9e;");
      breaks.setAttribute("style", "background-color: #00cf9e; color: #f9f9f9;");

      this.displayTime(this.minutes, "configureTime");
    }
  }
  Clock.prototype.countDown = function() {
    var clock = this;

    if(clock.seconds === 60) {
      clock.seconds = 0;
    }
    if(!this.paused) {
      var countdown = setInterval(function() {
        if(clock.paused) {
          clearInterval(countdown);
        }

        if(clock.minutes === 0 && clock.seconds <= 1) {
          clock.togglePaused();
          clock.power = false;
          clearInterval(countdown);
        }
        if(clock.minutes <= 1) {
          clock.minutes = 0;
        }
        if(clock.seconds < 1) {
          clock.minutes--;
          clock.seconds = 60;
        }

        clock.seconds--;

        clock.displayTime(clock.minutes + ":" + clock.seconds, "currentTime");

      }, 1000);
    }
  }
  return Clock;
})();
var session = new Clock(25);
var breaks = new Clock(5);

session.init();
module.exports = Clock;
