// Server configuration
const express = require("express");
const app = express();

app.use(express.static("./public"));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log("Server running on port:", PORT);
});

// Socket Configuration
const socket = require("socket.io");
const io = socket(server);

io.sockets.on("connection", newConnection);

// Sockets connection callback
function newConnection(socket) {
  console.log("New Connection:", socket.id);

  // Server receiving draw event, then broadcast again to all subscriber
  socket.on("draw", drawMsg);

  function drawMsg(data) {
    socket.broadcast.emit("draw", data);
    console.log("Received base64 dataURL:", data.type);
  }
}
