const express = require("express");
const ts = require("./ts");

function initServer(player, setSource, setDemoFrame) {
  const app = express();

  app.use(express.static("public"));
  //
  // app.use((req, res, next) => {
  //   // TODO remove this loader
  //   player.loadFile("./timelines/test.txt");
  //   next();
  // });

  app.get("/", function(req, res) {
    res.send("Hello World!");
  });

  app.get("/loadfile", function(req, res) {
    try {
      player.loadFile(`./timelines/${req.query.file}`);
      res.send("OK");
    } catch (e) {
      res.send(e);
    }
  });

  app.get("/sync", function(req, res) {
    const timestamp = parseInt(req.query.ts);
    const currentTime = parseFloat(req.query.d);
    ts.setOffset(currentTime, timestamp);
    res.send("OK");
  });

  app.get("/demo", function(req, res) {
    setSource("demo");
    const frame = JSON.parse(req.query.data);
    setDemoFrame(frame);
    res.send("OK");
  });

  app.listen(3000, function() {
    console.log("в браузере http://localhost:3000");
  });
}

module.exports = { initServer };
