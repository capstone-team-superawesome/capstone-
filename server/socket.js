// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const socket = require("socket.io");
// const io = socket(server);

let users = [];

module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
      console.log(
        `a user has connected with id of ${socket.id} to room ${roomName}`
      );
      socket.on("drawing", ( data) => {
        console.log(data)
        const {roomName} = data;
        // socket.to(roomName).emit("drawing", data);
        socket.to(roomName).emit("drawing" , data)
      });
    });
    // socket.on("drawing", (data) => {
    //   socket.emit("drawing", data);
    // });

    //emitting the drawing event to only players inside the room
  });
};
