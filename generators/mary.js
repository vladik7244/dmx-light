const { TimelineGenerator } = require("../timeline-generator");

const tg = new TimelineGenerator();

const fullDark = [0, 0, 0, 0, 0, 0, 0, 0];
const yellowDark = [100, 250, 250, 100, 50, 0, 0, 0];
const yellowBrighter = [160, 250, 250, 100, 50, 0, 0, 0];
const theMostBrightYellow = [255, 250, 250, 100, 100, 0, 0, 0];
const maxLight = [255, 255, 255, 255, 255, 0, 0, 0];

tg.setKeyFrames([
  {
    ts: 0,
    rule: {
      all: fullDark
    }
  },
  {
    ts: 8,
    animate: true,
    rule: {
      c: yellowDark
    }
  },
  {
    ts: 18
  },
  {
    ts: 19,
    animate: true,
    rule: {
      all: yellowDark
    }
  },
  {
    ts: 37.6
  },
  {
    ts: 38.7,
    animate: true,
    rule: {
      all: yellowBrighter
    }
  },
  {
    ts: 97
  },
  {
    ts: 100,
    animate: true,
    rule: {
      all: fullDark,
      c: yellowDark
    }
  },
  {
    ts: 115,
    rule: {
      all: theMostBrightYellow
    }
  },
  {
    ts: 138
  },
  {
    ts: 139,
    animate: true,
    rule: {
      all: yellowBrighter
    }
  },
  {
    ts: 178
  },
  {
    ts: 179.5,
    animate: true,
    rule: {
      all: fullDark,
      c: yellowDark
    }
  },
  {
    ts: 185
  },
  {
    ts: 190,
    animate: true,
    rule: {
      all: fullDark
    }
  },
  {
    ts: 200,
  }
]);

tg.save("./timelines/mary");
