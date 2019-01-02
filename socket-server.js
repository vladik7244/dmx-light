const WebSocket = require("ws");

let subscribers = [];

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", ws => {
  subscribers.push(ws);
  //
  // ws.on('message', message => {
  //   console.log(`Received message => ${message}`)
  // })
  // ws.send("ho!");
});

wss.on("close", ws => {
  console.log("close", ws);
  //
  // ws.on('message', message => {
  //   console.log(`Received message => ${message}`)
  // })
  // ws.send("ho!");
});

function emit(msg) {
  subscribers.forEach(ws => {
    try {
      ws.send(msg);
    } catch (e) {
      subscribers.splice(subscribers.indexOf(ws), 1);
    }
  });
}

module.exports = {
  emit
};
