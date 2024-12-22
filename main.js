// This is main JS file
// Get references for elements
const newTaskText = document.querySelector(".to-do-input .input");
const addTaskBtn = document.querySelector(".to-do-input .btn");
const todoList = document.querySelector(".to-do-list");
const todoListAltText = document.querySelector(".to-do-list .alt-text");
const lastTask = document.querySelector(".to-do-list > .to-do-task:last-child");
const snackbar = document.querySelector(".snackbar");
// Retrieve and display data from LocalStorage
// const todoTasks = localStorage.getTask("todo-Tasks");
let todoTasksCount = 0;
// Function to create new Todo Task
const createNewTask = (text) => {
  const newTaskFragment = new DocumentFragment();
  const newTaskContainer = document.createElement("div");
  newTaskContainer.classList.add("to-do-task", "rounded","flex");
  // newTaskContainer.dataset.id = lastTastId + 1;
  // lastTastId++;
  const readingMark = document.createElement("span");
  readingMark.classList.add("reading-mark", "btn-rounded");
  newTaskContainer.appendChild(readingMark);
  const taskText = document.createElement("span");
  const taskTextNode = document.createTextNode(text);
  taskText.appendChild(taskTextNode);
  taskText.classList.add("task-text","font-18","flex");
  newTaskContainer.appendChild(taskText);
  const taskEditBtn = document.createElement("button");
  taskEditBtn.type = "button";
  taskEditBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
  taskEditBtn.classList.add("btn", "btn-rounded", "btn-edit");
  newTaskContainer.appendChild(taskEditBtn);
  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.type = "button";
  taskDeleteBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
  taskDeleteBtn.classList.add("btn", "btn-rounded", "btn-delete");
  newTaskContainer.appendChild(taskDeleteBtn);
  newTaskFragment.appendChild(newTaskContainer);
  todoList.appendChild(newTaskFragment);
  todoTasksCount++;
};
// Function to create task card
const createTaskCard = (taskContainer, text) => {
  const taskCardFragment = new DocumentFragment();
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  const card = document.createElement("div");
  card.classList.add("card", "rounded","flex-col");
  const cardHeader = document.createElement("div");
  cardHeader.classList.add("card-header","flex");
  const cardtitle = document.createElement("h2");
  cardtitle.innerHTML = "Edit the task";
  cardtitle.classList.add("card-title","font-18");
  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.innerHTML = "X";
  closeBtn.classList.add("btn", "btn-close", "btn-rounded","font-18");
  cardHeader.appendChild(closeBtn);
  cardHeader.appendChild(cardtitle);
  card.appendChild(cardHeader);
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body","flex-col");
  const cardText = document.createElement("input");
  cardText.type = "text";
  cardText.value = text;
  cardText.classList.add("card-text", "rounded","font-18");
  cardBody.appendChild(cardText);
  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.innerHTML = "Save";
  saveBtn.classList.add("btn-save", "btn", "rounded","font-18");
  cardBody.appendChild(saveBtn);
  card.appendChild(cardBody);
  overlay.appendChild(card);
  taskCardFragment.appendChild(overlay);
  taskContainer.appendChild(taskCardFragment);

  // Handle the click event of the closeBTn button and saveBtn Button
  overlay.addEventListener("click", (e) => {
    if (e.target.matches(".btn-close")) {
      e.currentTarget.remove();
    } else if (e.target.matches(".btn-save")) {
      e.currentTarget.parentNode.children[1].innerHTML =
        e.currentTarget.children[0].children[1].children[0].value;
      e.currentTarget.remove();
      showSnackbar("The task has been edited.");
    }
  });
};
// Function to show snackbar
const showSnackbar = (msg) => {
  snackbar.innerHTML = msg;
  snackbar.classList.add("show");
  setTimeout(() => {
    snackbar.classList.remove("show");
  }, 3000);
};
// Function to add new Todo Task
const addNewTask = () => {
  let trimmedText = newTaskText.value.trim();
  if (trimmedText !== "") {
    todoListAltText.style.display = "none";
    createNewTask(trimmedText);
    newTaskText.value = "";
    showSnackbar("New task added");
  }
};
// Handle the click event of the addTaskBtn button
addTaskBtn.addEventListener("click", (e) => {
  addNewTask();
});
// Handle the keypress event of the addTaskBtn button
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addNewTask();
  }
});
// Function to delete Todo Task
const deleteTask = (task) => {
  task.classList.add("hide");
  setTimeout(() => {
    task.classList.remove("hide");
    task.remove();
    showSnackbar("The task has been deleted.");
    todoTasksCount--;
    if (todoTasksCount === 0) {
      todoListAltText.style.display = "block";
    }
  }, 1500);
};
// Handle the click event of the taskEditBtn button and taskDeleteBtn button and cardText
todoList.addEventListener("click", (e) => {
  if (e.target.matches(".btn-edit")) {
    createTaskCard(
      e.target.parentNode,
      e.target.parentNode.children[1].innerHTML
    );
  } else if (e.target.matches(".btn-delete")) {
    deleteTask(e.target.parentNode);
  } else if (e.target.matches(".task-text")) {
    e.target.parentNode.children[0].innerHTML = `<i class="fa-solid fa-check"></i>`;
    e.target.parentNode.style.backgroundColor = "var(--secondaryColor)";
    showSnackbar("The task has been read.");
  }
});
