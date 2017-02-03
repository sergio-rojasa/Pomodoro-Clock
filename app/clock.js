var Clock = function(minutes) {
  this.minutes = minutes;
  this.seconds = 60;
  this.paused = true;

  this.init = function() {
    var currentTime = document.getElementById("currentTime");
    var configureTime = document.getElementById("configureTime");

    currentTime.innerHTML = this.minutes;
    configureTime.innerHTML = this.minutes;
  };
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
    var configureTime = document.getElementById("configureTime");
    configureTime.innerHTML = this.minutes;
  };
  this.minusAMinute = function() {
    if(this.minutes === 1) {
      return this.minutes;
    }
    this.minutes--;
    var configureTime = document.getElementById("configureTime");
    configureTime.innerHTML = this.minutes;
  };
  this.switchConfigure = function(clock) {
    var minus = document.getElementById("minus");
    var plus = document.getElementById("plus");
    var session = document.getElementById("session");
    var breaks = document.getElementById("break");
    var configureTime = document.getElementById("configureTime");


    console.log(this);
    if(clock == "session") {
      minus.setAttribute("onclick", "session.minusAMinute()");
      plus.setAttribute("onclick", "session.addAMinute()");

      session.setAttribute("style", "background-color: #00cf9e;   color: #f9f9f9;");
      breaks.setAttribute("style", "background-color: #f9f9f9; color: #00cf9e; border: 5px solid #00cf9e;");
      configureTime.innerHTML = this.minutes;
    }
    else if(clock == "breaks"){
      minus.setAttribute("onclick", "breaks.minusAMinute()");
      plus.setAttribute("onclick", "breaks.addAMinute()");

      session.setAttribute("style", "background-color: #f9f9f9; color: #00cf9e; border: 5px solid #00cf9e;");
      breaks.setAttribute("style", "background-color: #00cf9e;   color: #f9f9f9;");
      configureTime.innerHTML = this.minutes;
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

var session = new Clock(25);
var breaks = new Clock(5);
session.init();

module.exports = Clock;
