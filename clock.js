const hh = document.getElementById("hour");
const mm = document.getElementById("minute");
const ss = document.getElementById("second");
const separators = document.querySelectorAll(".clock");

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  window.hh.innerText = hour;
  window.mm.innerText = min;
  window.ss.innerText = ss;
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
