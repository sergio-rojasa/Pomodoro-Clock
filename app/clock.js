var Clock = (function() {
  function Clock() {
  };
  Clock.prototype.seconds = 60;
  Clock.prototype.paused = true;
  Clock.prototype.power = false;
  Clock.prototype.type = null;

  Clock.prototype.init = function(minutes) {
    var clock = document.getElementById("clock");
    var minus = document.getElementById("minus");
    var plus = document.getElementById("plus");
    this.power = true;
    this.seconds = 0;

    if(this.type == 'session') {
      this.minutes = 25;
      this.display("SESSION", "type");
      this.display(this.minutes, "currentTime");
      this.display(this.minutes, "configureMinute");
      clock.setAttribute("onclick", "session.togglePaused(); session.countDown()");
      minus.setAttribute("onclick", "session.minusAMinute()");
      plus.setAttribute("onclick", "session.addAMinute()");
    }
    if(this.type == 'breaks') {
      this.minutes = 5;
      this.display("BREAK", "type");
      this.display(this.minutes, "currentTime");
      this.display(this.minutes, "configureMinute");
      clock.setAttribute("onclick", "breaks.togglePaused(); breaks.countDown()");
      minus.setAttribute("onclick", "breaks.minusAMinute()");
      plus.setAttribute("onclick", "breaks.addAMinute()");
    }
  };
  Clock.prototype.display = function(value, element) {
    var element = document.getElementById(element);
    element.innerHTML = value;
  };
  Clock.prototype.togglePaused = function() {
    this.paused = !this.paused;
  };
  Clock.prototype.addAMinute = function() {
    if(this.paused) {
      this.minutes++;
      this.seconds = 0;

      if(this.power) {
        this.display(this.minutes, "currentTime");
      }
      this.display(this.minutes, "configureMinute");
    }
  };
  Clock.prototype.minusAMinute = function() {
    if(this.paused) {
      if(this.minutes <= 1) {
        return this.minutes = 1;
      }
      this.minutes--;
      this.seconds = 0;
      if(this.power) {
        this.display(this.minutes, "currentTime");
      }
      this.display(this.minutes, "configureMinute");
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

      this.display(this.minutes, "configureMinute");
    }
    else if(clock == "breaks") {
      minus.setAttribute("onclick", "breaks.minusAMinute()");
      plus.setAttribute("onclick", "breaks.addAMinute()");

      session.setAttribute("style", "background-color: #f9f9f9; color: #00cf9e; border: 5px solid #00cf9e;");
      breaks.setAttribute("style", "background-color: #00cf9e; color: #f9f9f9;");

      this.display(this.minutes, "configureMinute");
    }
  }
  Clock.prototype.countDown = function() {
    var clock = this;

    if(!this.paused) {
      var countdown = setInterval(function() {
        if(clock.paused) {
          clearInterval(countdown);
        }
        if(clock.minutes === 0 && clock.seconds <= 1) {
          clock.power = false;
          clock.togglePaused();
          clock.seconds = 0;
          clearInterval(countdown);
          if(clock.type === "session") {
            delete session;
            breaks.init(5);
            breaks.switchConfigure("breaks");
            return;
          }
          else if(clock.type === "breaks") {
            session.init(25);
            session.switchConfigure("session");
            return;
          }
        }
        if(clock.seconds < 1) {
          clock.minutes--;
          clock.seconds = 60;
        }
        clock.seconds--;
        clock.display(clock.minutes + ":" + clock.seconds, "currentTime");
      }, 1000);
    }
  }
  return Clock;
})();
var session = new Clock();
var breaks = new Clock();
session.type = "session";
breaks.type = "breaks";

session.init();
module.exports = Clock;
