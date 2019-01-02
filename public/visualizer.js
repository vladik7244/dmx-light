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

function onData(data) {
  const p1 = getConfig(data, 0);
  const p2 = getConfig(data, 8);
  const p3 = getConfig(data, 16);
  const p4 = getConfig(data, 24);
  const p5 = getConfig(data, 32);
  const p6 = getConfig(data, 40);
  const p7 = getConfig(data, 48);
  const p8 = getConfig(data, 56);

  applyConfig($p1, p1);
  applyConfig($p2, p2);
  applyConfig($p3, p3);
  applyConfig($p4, p4);
  applyConfig($p5, p5);
  applyConfig($p6, p6);
  applyConfig($p7, p7);
  applyConfig($p8, p8);
}

ws.onmessage = msg => {
  const fileReader = new FileReader();
  fileReader.onload = function(event) {
    const bytes = new Uint8Array(event.target.result);
    onData(bytes);
  };
  fileReader.readAsArrayBuffer(msg.data);
};

function applyConfig($p, config) {
  const r = (config.r * (config.dimmer / 2 + 128)) / 255;
  const g = (config.g * (config.dimmer / 2 + 128)) / 255;
  const b = (config.b * (config.dimmer / 2 + 128)) / 255;
  const w = (config.w * (config.dimmer / 2 + 128)) / 255;

  $p.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
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
