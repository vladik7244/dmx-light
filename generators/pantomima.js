const { TimelineGenerator } = require("../timeline-generator");

const tg = new TimelineGenerator();

const darkBlue = [150, 0, 50, 255, 50, 0, 0, 0];
const dark1Blue = [200, 0, 50, 255, 50, 0, 0, 0];
const blue = [255, 0, 50, 255, 50, 0, 0, 0];
const brightBlue = [255, 150, 150, 255, 80, 0, 0, 0];
const moreBrightBlue = [255, 200, 200, 255, 160, 0, 0, 0];
const red = [255, 255, 0, 0, 0, 0, 0, 0];
const yellow = [200, 200, 200, 0, 100, 0, 0, 0];
const fullDark = [0, 0, 0, 0, 0, 0, 0, 0];
const dirty = [205, 84, 177, 129, 0, 0, 0, 0];
const dirtyBright = [255, 84, 177, 129, 255, 0, 0, 0];
const blinking = [90, 100, 100, 100, 100, 0, 0, 0];
const prebright = [130, 255, 255, 255, 0, 0, 0, 0];
const bright = [255, 255, 255, 255, 255, 0, 0, 0];
const endblue = [255, 80, 120, 255, 50, 0, 0, 0];

tg.setKeyFrames([
  {
    ts: 0,
    rule: {
      all: fullDark
    }
  },
  {
    ts: 7,
    animate: true,
    rule: {
      c: darkBlue
    }
  },
  {
    ts: 14.6
  },
  {
    ts: 15.6,
    animate: true,
    rule: {
      c: blue
    }
  },
  {
    ts: 20
  },
  {
    ts: 21,
    animate: true,
    rule: {
      all: blue
    }
  },
  {
    ts: 45.7,
    rule: {
      all: brightBlue
    }
  },
  {
    ts: 90
  },
  {
    ts: 91,
    animate: true,
    rule: {
      all: fullDark,
      r: moreBrightBlue
    }
  },
  {
    ts: 99
  },
  {
    ts: 102,
    animate: true,
    rule: {
      all: brightBlue
    }
  },
  {
    ts: 115.6
  },
  {
    ts: 115.8,
    animate: true,
    rule: {
      all: brightBlue,
      l: red,
      r: red
    }
  },
  {
    ts: 153
  },
  {
    ts: 155.5,
    animate: true,
    rule: {
      all: yellow
    }
  },
  {
    ts: 175.4,
    rule: {
      l: red,
      cl: red,
      cr: yellow,
      r: yellow
    }
  },
  {
    ts: 189
  },
  {
    ts: 190,
    animate: true,
    rule: {
      l: yellow,
      cl: yellow,
      cr: red,
      r: red
    }
  },
  {
    ts: 199
  },
  {
    ts: 200,
    animate: true,
    rule: {
      all: dirty
    }
  },
  {
    ts: 220.7,
    rule: {
      l1: red,
      r4: red
    }
  },
  {
    ts: 241.6,
    rule: {
      c: red
    }
  },
  {
    ts: 241.9,
    rule: {
      c: dirty
    }
  },
  {
    ts: 242.7,
    rule: {
      c: red
    }
  },
  {
    ts: 243,
    rule: {
      c: dirty
    }
  },
  {
    ts: 244,
    rule: {
      c: red
    }
  },
  {
    ts: 244.2,
    rule: {
      c: dirty
    }
  },
  {
    ts: 248, // MAIN red
    rule: {
      all: dirty,
      c: red
    }
  },
  {
    ts: 248.2,
    rule: {
      c: dirty
    }
  },
  {
    ts: 249,
    rule: {
      c: red
    }
  },
  {
    ts: 249.2,
    rule: {
      c: dirty
    }
  },
  // {
  //   ts: 249.6,
  //   rule: {
  //     c: red
  //   }
  // },
  // {
  //   ts: 249.8,
  //   rule: {
  //     c: dirty
  //   }
  // },
  {
    ts: 250.4,
    rule: {
      c: red
    }
  },
  {
    ts: 250.6,
    rule: {
      c: dirty
    }
  },
  // {
  //   ts: 251.2,
  //   rule: {
  //     c: red
  //   }
  // },
  // {
  //   ts: 251.4,
  //   rule: {
  //     c: dirty
  //   }
  // },
  {
    ts: 251.6,
    rule: {
      c: red
    }
  },
  {
    ts: 251.8,
    rule: {
      c: dirty
    }
  },
  // {
  //   ts: 252.8,
  //   rule: {
  //     c: red
  //   }
  // },
  // {
  //   ts: 253,
  //   rule: {
  //     c: dirty
  //   }
  // },
  {
    ts: 252.8,
    rule: {
      c: red
    }
  },
  {
    ts: 253,
    rule: {
      c: dirty
    }
  },
  // {
  //   ts: 254.4,
  //   rule: {
  //     c: red
  //   }
  // },
  // {
  //   ts: 254.6,
  //   rule: {
  //     c: dirty
  //   }
  // },
  {
    ts: 254,
    rule: {
      c: red
    }
  },
  {
    ts: 254.2,
    rule: {
      c: dirty
    }
  },
  {
    ts: 255.2,
    rule: {
      c: red
    }
  },
  {
    ts: 255.4,
    rule: {
      c: dirty
    }
  },
  {
    ts: 256.4,
    rule: {
      c: red
    }
  },
  {
    ts: 256.6,
    rule: {
      c: dirty
    }
  },
  {
    ts: 257.6,
    rule: {
      c: red
    }
  },
  {
    ts: 274.7
  },
  {
    ts: 276.5,
    animate: true,
    rule: {
      all: bright
    }
  },
  {
    ts: 277,
    rule: {
      l1: red,
      c: dirty,
      r4: red
    }
  },
  {
    ts: 294
  },
  {
    ts: 299,
    animate: true,
    rule: {
      c: red
    }
  },
  {
    ts: 305.6
  },
  {
    ts: 305.8,
    animate: true,
    rule: {
      all: fullDark,
      l1: red,
      r4: red
    }
  },
  {
    ts: 308.7,
    rule: {
      all: prebright
    }
  },
  {
    ts: 319
  },
  {
    ts: 319.3,
    animate: true,
    rule: {
      all: bright
    }
  },
  {
    ts: 322.5
  },
  {
    ts: 324,
    animate: true,
    rule: {
      all: endblue
    }
  },
  {
    ts: 333.4
  },
  {
    ts: 333.5,
    animate: true,
    rule: {
      all: bright
    }
  },
  {
    ts: 347
  },
  {
    ts: 353,
    animate: true,
    rule: {
      all: fullDark
    }
  }
]);

tg.save("./timelines/pantomima");
