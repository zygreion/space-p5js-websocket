const express = require("express");
const app = express();

app.use(express.static("./public"));

const server = app.listen(3000, () => {
  console.log("http://localhost:3000");
});

const socket = require("socket.io");
const io = socket(server);

io.sockets.on("connection", newConnection);

function newConnection(socket) {
  console.log("New Connection:", socket.id);

  socket.on("draw", drawMsg);

  function drawMsg(data) {
    socket.broadcast.emit("draw", data);
    console.log("Received base64 dataURL:", data.type);
  }
}
