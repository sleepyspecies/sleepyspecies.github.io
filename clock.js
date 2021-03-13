var ji = document.querySelector(".hour");
var hun = document.querySelector(".minute");
var byou = document.querySelector(".second");
var sep = document.getElementsByClassName("separator");
var bit = 0;

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
    window.sep[0].style.opacity = 0;
    window.sep[1].style.opacity = 0;
  } else {
    window.sep[0].style.opacity = 1;
    window.sep[1].style.opacity = 1;
  }
  window.bit = ~window.bit;
}

setInterval(function(){ flickerSeparator() }, 500);
