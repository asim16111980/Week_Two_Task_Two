// This is main JS file
// Get references for elements
const newTaskText = document.querySelector(".to-do-input .input");
const newTaskBtn = document.querySelector(".to-do-input .btn");
const todoList = document.querySelector(".to-do-list");
const todoListAltText = document.querySelector(".to-do-list .alt-text");
// Retrieve and display data from LocalStorage
// const todoTasks = localStorage.getTask("todo-Tasks");
// Create new Todo Task function
const createNewTask = (text) => {
  const newTaskFragment = new DocumentFragment();
  const newTaskContainer = document.createElement("div");
  newTaskContainer.dataset.id = 1;
  newTaskContainer.classList.add("to-do-task", "rounded");
  const readingMark = document.createElement("span");
  readingMark.classList.add("reading-mark", "rounded-button");
  newTaskContainer.appendChild(readingMark);
  const TaskText = document.createElement("span");
  const TaskTextNode = document.createTextNode(text);
  TaskText.appendChild(TaskTextNode);
  TaskText.classList.add("task-text");
  newTaskContainer.appendChild(TaskText);
  const TaskEdit = document.createElement("button");
  TaskEdit.type = "button";
  TaskEdit.innerHTML= `<i class="fa-solid fa-pen"></i>`;
  TaskEdit.classList.add("btn", "rounded-button");
  newTaskContainer.appendChild(TaskEdit);
  const TaskDelete = document.createElement("button");
  TaskDelete.type = "button";
  newTaskContainer.appendChild(TaskDelete);
  newTaskFragment.appendChild(newTaskContainer);
  todoList.appendChild(newTaskFragment);
};
// Add new Todo Task function
const addNewTask = () => {
  let trimmedText = newTaskText.value.trim();
  if (trimmedText !== "") {
    todoListAltText.style.display = "none";
    createNewTask(trimmedText);
    newTaskText.value = "";
  }
};
// newTaskBtn click event
newTaskBtn.addEventListener("click", (e) => {
  addNewTask();
});
// newTaskBtn keypress event
window.addEventListener("keypress", (e) => {
  console.log(e.key);
  if ((e.key === "Enter")) {
    addNewTask();
  }
});
