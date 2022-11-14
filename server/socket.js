const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

let users = [];

const onConnection = (socket) => {
  //whenever a user joins the server we create a user with their username and socket id and emit it
  socket.on("join server", (username) => {
    const user = {
      username,
      id: socket.id,
    };
    users.push(user);
    io.emit("new user", users);
  });

  //joining the room
  socket.on("join room", (roomName) => {
    socket.join(roomName);
  });

  //emitting the drawing event to only players inside the room
  socket.on("drawing", (data, roomName) =>
    socket.to(roomName).emit("drawing", data)
  );
  socket.on;

  //take care of player leaving the room
  socket.on("disconnect", () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit("new user", users);
  });
};

module.exports = onConnection;
