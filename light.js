const ts = require("./ts");
const { Player } = require("./playback");
const DMX = require("./udmx");
const { emit } = require("./socket-server");

const dmx = new DMX();
const player = new Player();

player.loadFile("./timelines/test.txt");

let source = "player"; // 'demo'
let demoFrame = Array(64); // 'demo'

function run() {
  // dmx.connect();

  setInterval(() => {
    const t = ts.getAudioPlaybackDuration();
    const bytes = source === "demo" ? new Uint8Array(demoFrame) : player.getFrame(t);

    // console.log('bytes', bytes);
    // dmx.setChannels(bytes, 0).catch(e => {
    //   console.log("ERR", e);
    // });

    emit(new Uint8Array(bytes));
  }, 30);
}

function demo(frame) {
  demoFrame = frame;
  source = "demo";
}

function setSource(s) {
  source = s;
}

module.exports = { player, run, demo, setSource };
