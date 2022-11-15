// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const socket = require("socket.io");
// const io = socket(server);

let users = [];

module.exports = (io) =>{
  io.on("connection" ,  (socket) =>{
    socket.on("joinServer", (username) => {
      const user = {
        username,
        id: socket.id,
      };
      users.push(user);
      console.log("new client has connected :" + socket.id);
      socket.emit("userList", users);


      //take care of player leaving the room
      socket.on("disconnect", () => {
        // users = users.filter((user) => user.id !== socket.id);
        users = users.shift();
        io.emit("new user", users);
        console.log("after disconnect", users)
      });
    });
    
    //joining the room
    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
    });
    
    //emitting the drawing event to only players inside the room
    socket.on("drawing", (data, roomName) =>
    socket.to(roomName).emit("drawing", data)
    );
    socket.on;
    
    
  })
  
}

