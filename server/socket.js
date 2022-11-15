// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const socket = require("socket.io");
// const io = socket(server);

let users = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`a user has connected with id of ${socket.id}`);

    socket.on("join_room", (roomName) => {
      socket.join(roomName);
    });

    socket.on("drawing", (data, roomName) => {
      socket.to(roomName).emit("drawing", data);
    });

    //joining the room
    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
    });

    //emitting the drawing event to only players inside the room
  });
};
