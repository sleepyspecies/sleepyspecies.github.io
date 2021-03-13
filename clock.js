var ji = document.querySelector(".hour");
var hun = document.querySelector(".minute");
var byou = document.querySelector(".second");
var sep = document.getElementsByClassName("separator");
var bit = 0;
var dot = ".";

function currentTime() {
  var date = new Date(); /* creating object of Date class */
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  window.ji.innerText = hour;
  window.hun.innerText = min;
  window.byou.innerText = sec;
  //var t = setTimeout(function(){ currentTime() }, 1000); /* setting timer */
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

function flickerSeparator() {
  if (window.bit == 0) {
    currentTime()
    window.sep[0].innerText = " ";
    window.sep[1].innerText = " ";
  } else {
    window.sep[0].innerText = window.dot;
    window.sep[1].innerText = window.dot;
  }
  window.bit = ~window.bit;
  var t = setTimeout(function(){ flickerSeparator() }, 500); /* setting timer */
}

flickerSeparator(); /* calling currentTime() function to initiate the process */
