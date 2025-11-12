const display = document.getElementById("display");
const historyList = document.getElementById("history");
let memory = parseFloat(localStorage.getItem("calcMemory")) || 0;


function append(value) {
  display.value += value;
}


function clearDisplay() {
  display.value = "";
}


function backspace() {
  display.value = display.value.slice(0, -1);
}


function calculate() {
  try {
    const result = eval(display.value);
    if (result !== undefined) {
      addToHistory(display.value + " = " + result);
      display.value = result;
    }
  } catch {
    alert("Invalid Expression!");
  }
}


function addToHistory(entry) {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  history.push(entry);
  localStorage.setItem("calcHistory", JSON.stringify(history));
  loadHistory();
}

function loadHistory() {
  let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyList.innerHTML = "";
  history.slice(-10).reverse().forEach((item) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.textContent = item;
    const btn = document.createElement("button");
    btn.textContent = "Use";
    btn.className = "btn btn-sm btn-outline-primary";
    btn.onclick = () => (display.value = item.split("=")[1].trim());
    li.appendChild(btn);
    historyList.appendChild(li);
  });
}

function clearHistory() {
  localStorage.removeItem("calcHistory");
  loadHistory();
}

// Memory Functions
function memoryAdd() {
  memory += parseFloat(display.value || 0);
  localStorage.setItem("calcMemory", memory);
}
function memorySubtract() {
  memory -= parseFloat(display.value || 0);
  localStorage.setItem("calcMemory", memory);
}
function memoryRecall() {
  display.value = memory;
}
function memoryClear() {
  memory = 0;
  localStorage.removeItem("calcMemory");
}


loadHistory();

