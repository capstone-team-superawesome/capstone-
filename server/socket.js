// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const socket = require("socket.io");
// const io = socket(server);

let users = [];
let rooms = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    if (users.length > 1) {
      socket.emit("refuse_connection");
    } else {
      socket.on("joinRoom", (roomName) => {
        socket.join(roomName);
        console.log(
          `a user has connected with id of ${socket.id} to room ${roomName}`
        );
        let newUser = {
          id: socket.id,
        };
        users.push(newUser);
        socket.emit("new user", users);

        //emit drawing to the room
        socket.on("drawing", (data) => {
          const { roomName } = data;
          // socket.to(roomName).emit("drawing", data);
          socket.to(roomName).emit("drawing", data);
        });

        //listen for user disconnecting
        socket.on("disconnect", () => {
          // socket.emit(`user with id : ${socket.id} has disconnected from server`);
          users = users.filter((user) => user.id !== socket.id);
          io.emit("new user", users);
        });
      });
    }
    // socket.on("drawing", (data) => {
    //   socket.emit("drawing", data);
    // });

    //emitting the drawing event to only players inside the room
  });
};
