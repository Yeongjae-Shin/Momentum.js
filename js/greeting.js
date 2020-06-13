const form = document.querySelector(".form");
const input = document.querySelector(".greeting-form");
const greeting = document.querySelector(".greeting");
const list = document.querySelector(".todoList");
const NAME_LS = "name";
const SHOWING_CN = "showing";

list.style.display = "none";

function saveName(text) {
  localStorage.setItem(NAME_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  displayName(currentValue);
  saveName(currentValue);
}

function displayForm() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function randomGreetingTalk() {
  const greetingTalk = [
    "Have a nice day",
    "Keep going",
    "Do as you wish",
    "You can make it",
    "You can be a Great Programmer",
  ];
  let getRandom;
  for (let i = 0; i < greetingTalk.length; i++) {
    getRandom = greetingTalk[Math.floor(Math.random() * i + 1)];
  }
  return getRandom;
}

function displayName(text) {
  const random = randomGreetingTalk();
  form.classList.remove(SHOWING_CN);
  input.style.display = "none";
  greeting.classList.add(SHOWING_CN);
  greeting.textContent = `${random}, ${text}!`;
  list.style.display = "block";
}

function loadName() {
  const currentName = localStorage.getItem(NAME_LS);
  if (currentName === null) {
    displayForm();
  } else {
    displayName(currentName);
  }
}

loadName();
