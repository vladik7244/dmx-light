const { TimelineGenerator } = require("../timeline-generator");

const tg = new TimelineGenerator();

const fullDark = [0, 0, 0, 0, 0, 0, 0, 0];
const common = [150, 255, 255, 200, 0, 0, 0, 0];
const dirty = [140, 150, 255, 255, 50, 0, 0, 0];
const red = [140, 255, 0, 0, 0, 0, 0, 0];
const bright = [255, 255, 255, 255, 255, 0, 0, 0];
const lowBright = [100, 255, 255, 255, 200, 0, 0, 0];

tg.setKeyFrames([
  {
    ts: 0,
    rule: {
      all: fullDark
    }
  },
  {
    ts: 10,
    animate: true,
    rule: {
      all: common
    }
  },
  {
    ts: 96.7
  },
  {
    ts: 97,
    animate: true,
    rule: {
      all: dirty
    }
  },
  {
    ts: 123.2
  },
  {
    ts: 123.4,
    animate: true,
    rule: {
      all: common
    }
  },
  {
    ts: 136.8,
    rule: {
      l1: red,
      r4: red
    }
  },
  {
    ts: 163.6,
    rule: {
      l: red,
      r: red
    }
  },
  {
    ts: 189.9
  },
  {
    ts: 190.1,
    animate: true,
    rule: {
      all: bright
    }
  },
  {
    ts: 216.6,
    animate: true,
    rule: {
      all: lowBright
    }
  },
  {
    ts: 216.8,
    animate: true,
    rule: {
      all: bright
    }
  },
  {
    ts: 274
  },
  {
    ts: 280,
    animate: true,
    rule: {
      all: fullDark
    }
  },
  {
    ts: 300
  }
]);

tg.save("./timelines/love");
