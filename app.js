const { run, player, setSource, demo } = require("./light");
const { initServer } = require("./server");
initServer(player, setSource, demo);
require("./socket-server");
run();
