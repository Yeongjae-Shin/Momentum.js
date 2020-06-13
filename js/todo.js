const toDoForm = document.querySelector(".todoForm");
const toDoInput = document.querySelector(".todoInput");
const pendingList = document.querySelector(".pending");
const finishedList = document.querySelector(".finish");
const PENDING_LS = "PENDING";
const FINISH_LS = "FINISHED";
const PENDING_STATUS = "doing";
const FINISH_STATUS = "done";
let pendingToDos = [];
let finishedToDos = [];

function returnToPend(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.firstChild.innerText;

  deleteTodo(event, FINISH_STATUS);
  paintTodo(text, PENDING_STATUS);
}

function finishTodo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = li.firstChild.innerText;
  deleteTodo(event, PENDING_STATUS);
  paintTodo(text, FINISH_STATUS);
}

function saveTodo(status) {
  if (status === PENDING_LS) {
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingToDos));
  } else if (status === FINISH_LS) {
    localStorage.setItem(FINISH_LS, JSON.stringify(finishedToDos));
  }
}

function deleteTodo(event, status) {
  const btn = event.target;
  const li = btn.parentNode;

  if (status === PENDING_STATUS) {
    pendingList.removeChild(li);
    const deleleToDos = pendingToDos.filter(function (toDo) {
      return toDo.id !== Number(li.id);
    });
    pendingToDos = deleleToDos;
    saveTodo(PENDING_LS);
  } else if (status === FINISH_STATUS) {
    finishedList.removeChild(li);
    const deleleToDos = finishedToDos.filter(function (toDo) {
      return toDo.id !== Number(li.id);
    });
    finishedToDos = deleleToDos;
    saveTodo(FINISH_LS);
  }
}

function paintTodo(text, status) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const chkBtn = document.createElement("button");
  const returnBtn = document.createElement("button");

  span.innerText = text;
  li.appendChild(span);
  li.appendChild(deleteBtn);
  if (status === PENDING_STATUS) {
    const id = pendingToDos.length + 1;
    deleteBtn.innerText = "✕";
    deleteBtn.addEventListener("click", function (event) {
      deleteTodo(event, PENDING_STATUS);
    });
    li.appendChild(deleteBtn);
    chkBtn.innerText = "✔︎";
    chkBtn.addEventListener("click", finishTodo);
    li.appendChild(chkBtn);
    pendingList.appendChild(li);
    const toDoObj = {
      id: id,
      text: text,
      status: PENDING_STATUS,
    };
    li.id = id;
    pendingToDos.push(toDoObj);
    saveTodo(PENDING_LS);
  } else if (status === FINISH_STATUS) {
    const id = finishedToDos.length + 1;
    deleteBtn.innerText = "✕";
    deleteBtn.addEventListener("click", function (event) {
      deleteTodo(event, FINISH_STATUS);
    });
    li.appendChild(deleteBtn);
    returnBtn.innerText = "⟳";
    returnBtn.addEventListener("click", returnToPend);
    li.appendChild(returnBtn);
    finishedList.appendChild(li);
    const toDoObj = {
      id: id,
      text: text,
      status: FINISH_STATUS,
    };
    li.id = id;
    finishedToDos.push(toDoObj);
    saveTodo(FINISH_LS);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintTodo(currentValue, PENDING_STATUS);
  toDoInput.value = "";
}

function loadTodos() {
  const currentPend = localStorage.getItem(PENDING_LS);
  const currentFin = localStorage.getItem(FINISH_LS);

  if (currentPend !== null || currentFin !== null) {
    const parsedPend = JSON.parse(currentPend);
    const parsedFin = JSON.parse(currentFin);
    parsedPend.forEach(function (toDo) {
      const text = toDo.text;
      paintTodo(text, PENDING_STATUS);
    });
    parsedFin.forEach(function (toDo) {
      const text = toDo.text;
      paintTodo(text, FINISH_STATUS);
    });
  }
}

function init() {
  loadTodos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
