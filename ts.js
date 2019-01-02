class TimeSync {
  constructor() {
    this._offset = 0;
  }

  setOffset(audioPlaybackDuration, dateNow) {
    this._offset = dateNow - audioPlaybackDuration * 1000;
  }

  getAudioPlaybackDuration() {
    return (Date.now() - this._offset) / 1000;
  }
}

const ts = new TimeSync();

module.exports = ts;
