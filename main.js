// This is main JS file
// Get references for elements
const newItemText = document.querySelector(".to-do-input .input");
const newItemBtn = document.querySelector(".to-do-input .btn");
const todoList = document.querySelector(".to-do-list");
// Retrieve and display data from LocalStorage
const todoItems = localStorage.getItem("todo-items");
// Create new Todo item function
const createNewItem = (text) => {
  const newItemFragment = new DocumentFragment();
  const newItemContainer = document.createElement("div");
  newItemContainer.dataset.id = 1;
  newItemContainer.classList.add("to-do-item", "rounded");
  const readingMark = document.createElement("span");
  readingMark.classList.add("reading-mark","rounded-full")
  newItemContainer.appendChild(readingMark);
  const itemText = document.createElement("span");
  const itemTextNode = document.createTextNode(text);
  itemText.append(itemTextNode);
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
  let trimmedText = newItemText.value.trim();
  console.log(trimmedText);
  if (trimmedText !== "") {
    createNewItem(trimmedText);
    newItemText.value = "";
  }
});
