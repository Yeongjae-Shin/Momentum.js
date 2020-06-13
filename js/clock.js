const clockContainer = document.querySelector("#clock");
const clock = document.querySelector(".time");

function getTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  clock.textContent = `${hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
