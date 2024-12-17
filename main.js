// This is main JS file
// Get references for elements
const newItemText = document.querySelector(".to-do-input .input");
const newItemBtn = document.querySelector(".to-do-input .btn");
const todoList = document.querySelector(".to-do-list");
// Retrieve and display data from LocalStorage
const todoItems = localStorage.getItem("todo-items");
// Create new Todo item function
const createNewItem = () => {
  const newItemFragment = new DocumentFragment();
  const newItemContainer = document.createElement("div");
  const readingMark = document.createElement("span");
  newItemContainer.appendChild(readingMark);
  const itemText = document.createElement("span");
  newItemContainer.appendChild(itemText);
  const itemEdit = document.createElement("button");
  newItemContainer.appendChild(itemEdit);
  const itemDelete = document.createElement("button");
  newItemContainer.appendChild(itemDelete);
  newItemFragment.appendChild(newItemContainer);
  todoList.appendChild(newItemFragment);
};
// newItemBtn click event
newItemBtn.addEventListener("click", () => {
  let newItemText
  if (newItemText.value !== "") {
    console.log(typeof newItemText.value);
    "m".trim()
    createNewItem();
  }
});
