const ws = new WebSocket("ws://localhost:8080");
window.ws = ws;

const $p1 = document.getElementById("p1");
const $p2 = document.getElementById("p2");
const $p3 = document.getElementById("p3");
const $p4 = document.getElementById("p4");
const $p5 = document.getElementById("p5");
const $p6 = document.getElementById("p6");
const $p7 = document.getElementById("p7");
const $p8 = document.getElementById("p8");
const elements = [$p1, $p2, $p3, $p4, $p5, $p6, $p7, $p8];

function onClick(e) {
  const index = e.target.dataset.index;
  toggleSelection(index, !e.shiftKey);
}

document.querySelectorAll(".light").forEach(element => {
  element.addEventListener("click", onClick);
});

function applyConfig($p, config, index) {
  const r = (config.r * (config.dimmer / 2 + 128)) / 255;
  const g = (config.g * (config.dimmer / 2 + 128)) / 255;
  const b = (config.b * (config.dimmer / 2 + 128)) / 255;
  const w = (config.w * (config.dimmer / 2 + 128)) / 255;

  $p.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  console.log(selected[index], index);
  console.log()
  $p.style.outline = selected[index] ? `4px solid red` : "";
  $p.innerHTML = `
  <p>${config.strobe}</p>
  <p>${config.fn}</p>
  <p>${config.speed}</p>
  <div></div>
  `;
  $p.querySelector("div").style.backgroundColor = `rgb(${w}, ${w}, ${w})`;
}

function getConfig(data, offset = 0) {
  data = data.slice(offset, offset + 8);
  const dimmer = data[0];
  const r = data[1];
  const g = data[2];
  const b = data[3];
  const w = data[4];
  const strobe = data[5];
  const fn = data[6];
  const speed = data[7];

  return {
    dimmer,
    r,
    g,
    b,
    w,
    strobe,
    fn,
    speed
  };
}

function arrToConfig(data) {
  const dimmer = data[0];
  const r = data[1];
  const g = data[2];
  const b = data[3];
  const w = data[4];
  const strobe = data[5];
  const fn = data[6];
  const speed = data[7];

  return {
    dimmer,
    r,
    g,
    b,
    w,
    strobe,
    fn,
    speed
  };
}
const lamps = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0]
];

let selected = [true, false, false, false, false, false, false, false];
function resetSelection() {
  selected = [false, false, false, false, false, false, false, false];
}
function toggleSelection(ind, resetAll = true) {
  if (resetAll) {
    resetSelection();
  }
  selected[ind] = !selected[ind];
}

function update() {
  for (let i = 0; i < 8; i++) {
    applyConfig(elements[i], arrToConfig(lamps[i]), i);
  }
}

function pushToSelected() {
  for (let i = 0; i < 8; i++) {
    if (selected[i]) {
      lamps[i] = [dim, red, green, blue, white, 0, 0, 0];
    }
  }
}

function sendFrame() {
  const frame = lamps.flat();
  fetch(`/demo?data=${JSON.stringify(frame)}`);
}

const dimSlider$ = document.getElementById("dim");
const redSlider$ = document.getElementById("red");
const greenSlider$ = document.getElementById("green");
const blueSlider$ = document.getElementById("blue");

let dim = 0;
let red = 0;
let green = 0;
let blue = 0;
let white = 0;
dimSlider$.oninput = function() {
  dim = parseInt(dimSlider$.value);
  pushToSelected();
};
redSlider$.oninput = function() {
  red = parseInt(redSlider$.value);
  pushToSelected();
};
greenSlider$.oninput = function() {
  green = parseInt(greenSlider$.value);
  pushToSelected();
};
blueSlider$.oninput = function() {
  blue = parseInt(blueSlider$.value);
  pushToSelected();
};

setInterval(update, 30);
setInterval(sendFrame, 200);
