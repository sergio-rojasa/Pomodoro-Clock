var Clock = function(minutes) {
  this.minutes = minutes;
  this.seconds = 60;
  this.paused = true;
  this.power = false;

  this.init = function() {
    this.displayTime(this.minutes, "currentTime");
    this.displayTime(this.minutes, "configureTime");
  };
  this.togglePaused = function() {
    this.paused = !this.paused;
  };
  this.displayTime = function(time, element) {
    var element = document.getElementById(element);
    element.innerHTML = time;
  }
  this.addAMinute = function() {
    this.minutes++;

    this.displayTime(this.minutes, "currentTime");
    this.displayTime(this.minutes, "configureTime");
  };
  this.minusAMinute = function() {
    if(this.minutes === 1) {
      return this.minutes;
    }
    this.minutes--;

    this.displayTime(this.minutes, "currentTime");
    this.displayTime(this.minutes, "configureTime");
  };
  this.switchConfigure = function(clock) {
    var minus = document.getElementById("minus");
    var plus = document.getElementById("plus");
    var session = document.getElementById("session");
    var breaks = document.getElementById("break");

    if(clock == "session") {
      minus.setAttribute("onclick", "session.minusAMinute()");
      plus.setAttribute("onclick", "session.addAMinute()");

      session.setAttribute("style", "background-color: #00cf9e;   color: #f9f9f9;");
      breaks.setAttribute("style", "background-color: #f9f9f9; color: #00cf9e; border: 5px solid #00cf9e;");

      this.displayTime(this.minutes, "configureTime");
    }
    else if(clock == "breaks"){
      minus.setAttribute("onclick", "breaks.minusAMinute()");
      plus.setAttribute("onclick", "breaks.addAMinute()");

      session.setAttribute("style", "background-color: #f9f9f9; color: #00cf9e; border: 5px solid #00cf9e;");
      breaks.setAttribute("style", "background-color: #00cf9e;   color: #f9f9f9;");
      this.displayTime(this.minutes, "configureTime");
    }
  }
  this.countdown = function() {
    var clock = this;
    var minutes = clock.minutes - 1;

    if(!clock.paused) {

      var countDown = setInterval(function() {
        if(clock.paused) {
          clearInterval(countDown);
        }
        if(minutes === 0 && clock.seconds <= 1) {
          clock.togglePaused();
          clock.power = false;
          clearInterval(countDown);
        }
        if(minutes <= 1) {
          minutes = 0;
        }
        if(clock.seconds < 1) {
          minutes--;
          clock.seconds = 60;
        }

        clock.seconds--;

        clock.displayTime(minutes + ":" + clock.seconds, "currentTime");
      }, 1000);
    }
  };
};

var session = new Clock(25);
var breaks = new Clock(5);
session.power = true;
session.init();

module.exports = Clock;
