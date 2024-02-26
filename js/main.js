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
const clearBtn = document.querySelector(".clearBtn");
const start = document.getElementById("startPh");
const inProgress = document.getElementById("inProgressPh");
const done = document.getElementById("donePh");

const tasks = [[], [], []];

function getTemplate(task, index) {
  return `<div class="task" draggable="true" data-index="${index}">${task}</div>`;
}

submit.addEventListener("click", () => {
  if (task.value.length === 0) {
    return;
  }
  const newTask = {
    title: task.value,
  };
  console.log(tasks[0]);
  tasks[0].push(newTask);
  render(tasks);
  task.value = "";
});

function render(array) {
  start.innerHTML = "";
  inProgress.innerHTML = "";
  done.innerHTML = "";
  for (let i = 0; i < array[0].length; ++i) {
    start.insertAdjacentHTML("afterbegin", getTemplate(array[0][i].title, i));
  }
  for (let i = 0; i < array[1].length; ++i) {
    inProgress.insertAdjacentHTML(
      "afterbegin",
      getTemplate(array[1][i].title, i)
    );
  }
  for (let i = 0; i < array[2].length; ++i) {
    done.insertAdjacentHTML("afterbegin", getTemplate(array[2][i].title, i));
  }
}

render(tasks);
