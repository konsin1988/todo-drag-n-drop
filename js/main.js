const date = document.getElementById("date");
const time = document.getElementById("time");
const timer = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

/********************* Date-Time  ***************** */
let time_options = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};

const formatDate = new Intl.DateTimeFormat("ru-Ru");
const formatTime = new Intl.DateTimeFormat("ru-Ru", time_options);

function createDateTime(now) {
  this.date = formatDate.format(now);
  this.time = formatTime.format(now);
  this.setDateTime = function () {
    date.textContent = this.date;
    time.textContent = this.time;
  };
}

update();

function update() {
  const now = new createDateTime(new Date());
  now.setDateTime();
}
setInterval(() => {
  update();
}, 1000);

/**************************** Timer ************************ */

let counter = 0;
let isRunning = false;
let intervalId;

function updateTimer(counter) {
  timer.textContent = formatTime.format(-10800000 + counter * 1000);
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startBtn.textContent = "Stop";
    intervalId = setInterval(() => {
      ++counter;
      updateTimer(counter);
      isRunning = true;
    }, 1000);
  } else {
    stopInterval();
  }
});

resetBtn.addEventListener("click", () => {
  counter = 0;
  stopInterval();
});
function stopInterval() {
  clearInterval(intervalId);
  startBtn.textContent = "Start";
  isRunning = false;
  updateTimer(counter);
}

/*************************** Tasks ********************/

const task = document.getElementById("inputTask");
const submit = document.getElementById("submitBtn");
const placeholders = document.querySelectorAll(".placeholder");
let tasksDoc = document.querySelectorAll(".task");

const tasks = [[], [], []];

function clearInnerHTML() {
  for (let holder of placeholders) {
    holder.innerHTML = "";
  }
}

function getTemplate(task, placeholder, index) {
  return `<div class="task" draggable="true" data-holder=${placeholder} data-index="${index}">${task}</div>`;
}

submit.addEventListener("click", () => {
  if (task.value.length === 0) {
    return;
  }
  const newTask = {
    title: task.value,
  };
  tasks[0].push(newTask);
  render(tasks);
  task.value = "";
});

function render(array) {
  clearInnerHTML();
  for (let i = 0; i < placeholders.length; ++i) {
    for (let j = 0; j < array[i].length; ++j) {
      placeholders[i].insertAdjacentHTML(
        "afterbegin",
        getTemplate(array[i][j].title, i, j)
      );
    }
  }
  tasksDoc = document.querySelectorAll(".task");
  for (let task of tasksDoc) {
    task.addEventListener("dragstart", dragstart);
    task.addEventListener("dragend", dragend);
  }
}

render(tasks);

/**************** Drag and Drop *************** */
let current = 0;
let placeholderDrag = 0;
let insertTask = 0;

for (const placeholder of placeholders) {
  placeholder.addEventListener("dragover", dragover);
  placeholder.addEventListener("dragenter", dragenter);
  placeholder.addEventListener("dragleave", dragleave);
  placeholder.addEventListener("drop", dragdrop);
}

function dragover(event) {
  event.preventDefault();
  if (event.target.dataset.index) {
    insertTask = +event.target.dataset.index;
    event.target.classList.add("taskOver");
  }
}
function dragenter(event) {
  event.target.classList.add("hovered");
}
function dragleave(event) {
  event.target.classList.remove("hovered");
  event.target.classList.remove("taskOver");
}
function dragdrop(event) {
  const newTask = {
    title: tasks[placeholderDrag][current].title,
  };
  tasks[placeholderDrag].splice(current, 1);
  render(tasks);
  const newPlaceholder = event.target.dataset.indexholder
    ? +event.target.dataset.indexholder
    : +event.target.dataset.holder;
  insertTask = newPlaceholder === placeholderDrag ? insertTask : insertTask + 1;
  insertTask = event.target.dataset.indexholder ? 0 : insertTask;
  tasks[newPlaceholder].splice(insertTask, 0, newTask);
  render(tasks);
  event.target.classList.remove("hovered");
}

function dragstart(event) {
  placeholderDrag = +event.target.dataset.holder;
  current = +event.target.dataset.index;
  event.target.classList.add("hold");

  setTimeout(() => {
    event.target.classList.add("hide");
  }, 0);
}
function dragend(event) {
  event.target.className = "task";
}

/******************** Crear *************/

const clearBtn = document.querySelector(".clearBtn");

clearBtn.addEventListener("click", () => {
  const cleanHolder = document.querySelectorAll(`.task[data-holder="2"]`);
  cleanHolder.forEach((elem) => {
    elem.classList.add("removeAnimation");
  });
  setTimeout(() => {
    tasks[2].length = 0;
    render(tasks);
  }, 900);
});
