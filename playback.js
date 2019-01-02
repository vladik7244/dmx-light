const fs = require("fs");

class Player {
  constructor() {
    this._data = null;
    this._fps = 24;
    this._frameSize = 64;
  }

  loadFile(fileName) {
    this._data = fs.readFileSync(fileName);
  }

  getFrame(ts) {
    if (!this._data) {
      // console.warn("not loaded");
      return [];
    }

    const start = this.tsToIndex(ts, this._fps) * this._frameSize;
    const end = start + this._frameSize;

    return this._data.slice(start, end);
  }

  tsToIndex(ts, fps) {
    return Math.floor(ts * fps);
  }
}

module.exports = {
  Player
};
