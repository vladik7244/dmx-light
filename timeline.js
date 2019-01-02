const R = require("ramda");

const timeline = [
  {
    from: 0,
    to: 5,
    l1: {
      d: 20,
      r: 255,
      g: 255,
    }
  },
  {
    from: 3,
    to: 10,
    l2: {
      d: 20,
      r: 100,
      g: 255,
    }
  }
];

function getActiveEntries(ts) {
  return timeline.filter(entry => {
    return entry.from <= ts && ts <= entry.to;
  });
}

function entryToBytes(entry) {
  return {
    0: R.pathOr(0, ["l1", "d"], entry),
    1: R.pathOr(0, ["l1", "r"], entry),
    2: R.pathOr(0, ["l1", "g"], entry),
    3: R.pathOr(0, ["l1", "b"], entry),
    4: R.pathOr(0, ["l1", "w"], entry),
    5: 0,
    6: 0,
    7: 0,

    8: R.pathOr(0, ["l2", "d"], entry),
    9: R.pathOr(0, ["l2", "r"], entry),
    10: R.pathOr(0, ["l2", "g"], entry),
    11: R.pathOr(0, ["l2", "b"], entry),
    12: R.pathOr(0, ["l2", "w"], entry),
    13: 0,
    14: 0,
    15: 0,

    16: R.pathOr(0, ["l3", "d"], entry),
    17: R.pathOr(0, ["l3", "r"], entry),
    18: R.pathOr(0, ["l3", "g"], entry),
    19: R.pathOr(0, ["l3", "b"], entry),
    20: R.pathOr(0, ["l3", "w"], entry),
    21: 0,
    22: 0,
    23: 0,

    24: R.pathOr(0, ["l4", "d"], entry),
    25: R.pathOr(0, ["l4", "r"], entry),
    26: R.pathOr(0, ["l4", "g"], entry),
    27: R.pathOr(0, ["l4", "b"], entry),
    28: R.pathOr(0, ["l4", "w"], entry),
    29: 0,
    30: 0,
    31: 0,
  
    32: R.pathOr(0, ["r1", "d"], entry),
    33: R.pathOr(0, ["r1", "r"], entry),
    34: R.pathOr(0, ["r1", "g"], entry),
    35: R.pathOr(0, ["r1", "b"], entry),
    36: R.pathOr(0, ["r1", "w"], entry),
    37: 0,
    38: 0,
    39: 0,
    40: R.pathOr(0, ["r2", "d"], entry),
    41: R.pathOr(0, ["r2", "r"], entry),
    42: R.pathOr(0, ["r2", "g"], entry),
    43: R.pathOr(0, ["r2", "b"], entry),
    44: R.pathOr(0, ["r2", "w"], entry),
    45: 0,
    46: 0,
    47: 0,
    48: R.pathOr(0, ["r3", "d"], entry),
    49: R.pathOr(0, ["r3", "r"], entry),
    50: R.pathOr(0, ["r3", "g"], entry),
    51: R.pathOr(0, ["r3", "b"], entry),
    52: R.pathOr(0, ["r3", "w"], entry),
    53: 0,
    54: 0,
    55: 0,
    56: R.pathOr(0, ["r4", "d"], entry),
    57: R.pathOr(0, ["r4", "r"], entry),
    58: R.pathOr(0, ["r4", "g"], entry),
    59: R.pathOr(0, ["r4", "b"], entry),
    60: R.pathOr(0, ["r4", "w"], entry),
    61: 0,
    62: 0,
    63: 0
  };
}

function getBytesByTs(ts) {
  const activeEntries = getActiveEntries(ts);

  if (activeEntries.length === 0) {
    return R.values(entryToBytes());
  }

  const entiesBytes = activeEntries.map(entryToBytes);
  const channels = R.keys(entiesBytes[0]);

  const obj = channels.map(channel => {
    return R.sum(entiesBytes.map(bytes => bytes[channel]));
  });

  const arr = R.values(obj);

  return arr;
}

module.exports = {
  getBytesByTs
};
