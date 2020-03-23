import "../styles/index.scss";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/js/all";
let pink;
let blue;
let yellow;
let violet;
(function() {
  pink = document.getElementById("pink");
  blue = document.getElementById("blue");
  yellow = document.getElementById("yellow");
  violet = document.getElementById("violet");

  const squares = [pink, blue, yellow, violet];
  squares.forEach(square => {
    const button = square.getElementsByTagName("button")[0];
    button.addEventListener("click", () => {
      addNewTask(square);
    });
    getAndDeleteElements(square);
  });
})();

function getAndDeleteElements(square) {
  //функция, которая переносит элементы с одного списка в другой
  const allLiInToDo = square.querySelectorAll(".toDo li");
  allLiInToDo.forEach(everyLiInToDo => {
    const checkBox = everyLiInToDo.querySelectorAll("input")[0];
    checkBox.addEventListener("click", () => {
      moveFromToDoIntoDone(everyLiInToDo, square);
    });
  });
  const standardElements = document.getElementsByTagName("span");
  standardElements.forEach(standardElement => {
    standardElement.addEventListener("click", () => {
      deleteLi(standardElement);
    });
  });
}
function moveFromToDoIntoDone(li, square) {
  const doneThing = square.querySelectorAll(".doneThings")[0];
  doneThing.appendChild(li);
  const checkBox = li.querySelectorAll("input")[0];
  checkBox.addEventListener("click", () => {
    fromDoneIntoToDo(li, square);
  });
}
function fromDoneIntoToDo(li, square) {
  const toDoThing = square.querySelectorAll(".toDo")[0];
  toDoThing.appendChild(li);
  const checkBox = li.querySelectorAll("input")[0];
  checkBox.addEventListener("click", () => {
    moveFromToDoIntoDone(li, square);
  });
}
function addNewTask(square) {
  const value = getInputValue(square);
  if (value) {
    addNewElement(value, square);
  }
}
function getInputValue(square) {
  const value = square.getElementsByClassName("addNewTask")[0].value;
  return value;
}

function addNewElement(value, square) {
  const list = square.getElementsByClassName("toDo")[0];
  const newLi = getLiWithText(value, square);
  list.appendChild(newLi);
}
function getLiWithText(value, square) {
  const newListItem = document.createElement("li");
  const checkBox = getCheckBox();
  const text = document.createTextNode(" " + value);
  const space = document.createTextNode(" ");
  const icon = getIcon();
  newListItem.appendChild(checkBox);
  newListItem.appendChild(text);
  newListItem.appendChild(space);
  newListItem.appendChild(icon);
  checkBox.addEventListener("click", () => {
    moveFromToDoIntoDone(newListItem, square);
  });
  return newListItem;
}
function getCheckBox() {
  const input = document.createElement("input");
  input.type = "checkbox";
  return input;
}
function getIcon() {
  const icon = document.createElement("i");
  const span = document.createElement("span");
  icon.className = "fas fa-trash";
  span.appendChild(icon);
  span.addEventListener("click", () => {
    deleteLi(span);
  });
  return span;
}
function deleteLi(span) {
  span.parentElement.remove();
}
