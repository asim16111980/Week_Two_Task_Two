// This is main JS file
window.addEventListener("load", () => {
  // Get references for elements
  const newTaskText = document.querySelector(".to-do-input .input");
  const addTaskBtn = document.querySelector(".to-do-input .btn");
  const todoList = document.querySelector(".to-do-list");
  const todoListAltText = document.querySelector(".to-do-list .alt-text");
  const lastTask = document.querySelector(
    ".to-do-list > .to-do-task:last-child"
  );
  const snackbar = document.querySelector(".snackbar");
  // Variable to stored tasks count
  let tasksCount;
  // Create task class
  class TaskData {
    constructor(id, text, isReading = false) {
      this.id = id;
      this.text = text;
      this.isReading = isReading;
    }
  }
  // Function to store new task data in localStorage
  const storeNewTaskData = (newTaskData) => {
    const retievedData = JSON.parse(localStorage.getItem("tasks")) || [];
    const newData = [...retievedData, newTaskData];
    localStorage.setItem("tasks", JSON.stringify(newData));
  };
  // Function to update tasks data property (isReading)  in localStorage
  const updateLocalStorage = (taskId, taskText = null) => {
    const retievedData = JSON.parse(localStorage.getItem("tasks"));
    console.log(taskText);
    if (retievedData !== null) {
      [...retievedData].forEach((data) => {
        if (taskId == data.id) {
          taskText == null ? (data.isReading = true) : (data.text = taskText);
        }
      });
    }
    localStorage.setItem("tasks", JSON.stringify(retievedData));
  };
  // Function to remove tasks data from localStorage
  const removeTaskData = (taskId) => {
    const retievedData = JSON.parse(localStorage.getItem("tasks"));
    if (retievedData !== null) {
      const TasksData = [...retievedData].filter((data) => {
        if (taskId != data.id) {
          return data;
        }
      });
      localStorage.setItem("tasks", JSON.stringify(TasksData));
    }
  };
  // Function to show snackbar
  const showSnackbar = (msg) => {
    snackbar.innerHTML = msg;
    snackbar.classList.add("show");
    setTimeout(() => {
      snackbar.classList.remove("show");
    }, 3000);
  };
  // Function to create new Todo Task
  const createNewTask = (taskData) => {
    const newTaskFragment = new DocumentFragment();
    const newTaskContainer = document.createElement("div");
    newTaskContainer.classList.add(
      "to-do-task",
      "rounded",
      "flex",
      "gap-8",
      "bg-primary",
      "p-8"
    );
    taskData.isReading
      ? (newTaskContainer.style.backgroundColor = "var(--secondaryColor)")
      : "";

    newTaskContainer.id = taskData.id;
    newTaskContainer.innerHTML = `<span class="reading-mark btn-rounded bg-light">${
      taskData.isReading ? `<i class="fa-solid fa-check"></i>` : ""
    }</span><div class="task-text font-18 flex text-light">${
      taskData.text
    }</div><button type="button" class= "btn btn-rounded btn-edit text-primary bg-light"  ${
      taskData.isReading ? "disabled" : ""
    }><i class="fa-solid fa-pen"></i></button><button type="button" class="btn btn-rounded btn-delete bg-light"><i class="fa-solid fa-trash-can"></i></button>`;
    newTaskFragment.appendChild(newTaskContainer);
    todoList.appendChild(newTaskFragment);
  };
  // Function to add new Todo Task
  const addNewTask = () => {
    let trimmedText = newTaskText.value.trim();
    if (trimmedText !== "") {
      todoListAltText.style.display = "none";
      const newTaskData = new TaskData(tasksCount, trimmedText);
      createNewTask(newTaskData);
      storeNewTaskData(newTaskData);
      newTaskText.value = "";
      showSnackbar("New task added");
      tasksCount++;
    }
  };
  // Retrieve and display data from LocalStorage if exit
  if (localStorage.getItem("tasks") !== null) {
    const retrivedTasks = JSON.parse(localStorage.getItem("tasks"));
    tasksCount = [...retrivedTasks].length;
    todoListAltText.style.display = "none";
    [...retrivedTasks].forEach((task) => {
      createNewTask({
        id: task.id,
        text: task.text,
        isReading: task.isReading,
      });
    });
  } else {
    tasksCount = 0;
  }
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
  // Function to create task card
  const createTaskCard = (taskContainer, text) => {
    const taskCardFragment = new DocumentFragment();
    const overlay = document.createElement("div");
    overlay.classList.add("overlay", "px-16", "py-8", "center", "flex");
    overlay.innerHTML = `<div class="card rounded flex-col bg-light b-1"><div class="card-header flex p-8"><button type="button" class= "btn btn-close btn-rounded font-18 bg-light">X</button><h2 class="card-title font-18 text-light">Edit the task</h2></div><div class="card-body flex flex-col gap-8 p-8"><input type="text" class="card-text rounded font-18 p-8 text-primary b-1 b-primary" value="${text}"/><button type="button" class= "btn-save btn rounded font-18 text-light bg-primary">Save</button></div></div>`;
    taskCardFragment.appendChild(overlay);
    taskContainer.appendChild(taskCardFragment);

    // Handle the click event of the closeBTn button and saveBtn Button
    overlay.addEventListener("click", (e) => {
      if (e.target.matches(".btn-close")) {
        e.currentTarget.remove();
      } else if (e.target.matches(".btn-save")) {
        const task = e.currentTarget.parentNode;
        const parent = e.target.parentNode;
        updateLocalStorage(task.id, parent.children[0].value);
        task.children[1].innerText = parent.children[0].value;
        e.currentTarget.remove();
        showSnackbar("The task has been edited.");
      }
    });
  };
  // Function to delete Todo Task
  const deleteTask = (task) => {
    task.classList.add("hide");
    setTimeout(() => {
      task.classList.remove("hide");
      task.remove();
      showSnackbar("The task has been deleted.");
      tasksCount--;
      if (tasksCount === 0) {
        todoListAltText.style.display = "block";
      }
    }, 1500);
  };
  // Handle the click event of todoList
  todoList.addEventListener("click", (e) => {
    if (e.target.matches(".task-text")||e.target.matches(".reading-mark")) {
      const parent = e.target.parentNode;
      parent.children[0].innerHTML = `<i class="fa-solid fa-check"></i>`;
      parent.style.backgroundColor = "var(--secondaryColor)";
      parent.children[2].disabled = true;
      updateLocalStorage(parent.id);
      showSnackbar("The task has been read.");
    } else if (e.target.matches(".btn-edit")) {
      const parent = e.target.parentNode;
      createTaskCard(parent, parent.children[1].innerHTML);
    } else if (e.target.matches(".btn-delete")) {
      removeTaskData(e.target.parentNode.id);
      deleteTask(e.target.parentNode);
    }
  });
});
