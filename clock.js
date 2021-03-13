var ji = document.getElementsByClassName("hour");
var hun = document.getElementsByClassName("minute");
var byou = document.getElementsByClassName("second");
var clock = document.getElementsByClassName("clock");

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  console.log(sec)
  window.ji.innerText = hour;
  window.hun.innerText = min;
  window.clock.innerText = sec;
  var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

currentTime(); /* calling currentTime() function to initiate the process */
