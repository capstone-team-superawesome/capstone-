// let rooms = {};
//module.exports = (io) => {
// io.on("connection", (socket) => {
//   let newUser = {
//     id: socket.id,
//   };
//   socket.on("joinRoom", (roomName) => {
//     if (!rooms[roomName]) {
//       rooms[roomName] = [newUser];
//       console.log("inside if statement", rooms);
//     } else if (rooms[roomName].length < 2) {
//       rooms[roomName].push(newUser);
//       console.log("Inside last else", rooms);
//       // console.log("checking length", rooms[roomName].length <= 2);

//       socket.join(roomName);
//       console.log(
//         `a user has connected with id of ${socket.id} to room ${roomName}`
//       );

//       io.emit("new user", rooms[roomName]);

//       // console.log("Inside socket.js", users);
//       // console.log("Inside socket.js", users.length);

//       if (rooms[roomName].length === 2) {
//         console.log("inside room full");
//         //use roomName
//         socket.to(roomName).emit("room_full", true);
//       }

//       //emit drawing to the room
//       socket.on("drawing", (data) => {
//         const { roomName } = data;
//         socket.to(roomName).emit("drawing", data);
//       });

//       //listen for user disconnecting
//       socket.on("disconnect", () => {
//         users = rooms[roomName].filter((user) => user.id !== socket.id);
//         io.emit("new user", users);
//       });

//       socket.on("guessMade", (data) => {
//         if (data) {
//           io.to(roomName).emit("guessReceived", data);
//         }
//       });

//       socket.on("beginTimer", (roomName) => {
//         console.log("backend", roomName);
//         const { gameCode } = roomName;
//         console.log("gameCode", gameCode);
//         if (rooms[roomName].length === 2) {
//           let timer = 60;
//           let timerCountDown = setInterval(() => {
//             io.to(gameCode).emit("timer", timer);
//             timer--;
//             if (timer === 0) {
//               io.to(gameCode).emit("timer", "Time's up !");
//               clearInterval(timerCountDown);
//             }
//           }, 1000);
//         }
//       });
//     } else {
//       socket.emit("refuse_connection");
//     }
//   });
// });

//};

// let users = [];

const allRooms = {};

module.exports = (io) => {
  io.on("connection", (socket) => {
    let newUser = {
      id: socket.id,
    };

    socket.on("joinRoom", (roomName) => {
      if (!allRooms[roomName]) {
        allRooms[roomName] = [];
      }
      if (allRooms[roomName] && allRooms[roomName].length < 2) {
        socket.join(roomName);
        console.log(
          `a user has connected with id of ${socket.id} to room ${roomName}`
        );

        //Need to get this work
        // if(allRooms[roomName][0] === )

        allRooms[roomName].push(newUser);
        // const host = users[0].id;
        io.emit("new user", allRooms);

        // socket.on("new user", (roomFull) => {
        //   if (roomFull) {
        //     socket.emit("roomFull", true);
        //   }
        // });

        if (allRooms[roomName].length === 2) {
          console.log("inside room full BACKEND");
          //use roomName
          socket.to(roomName).emit("room_full", true);
        }
        socket.on("drawing", (data) => {
          console.log("DRAWING DATA", data);
          const { roomName } = data;
          socket.to(roomName).emit("drawing", data);
        });
        //listen for user disconnecting
        socket.on("disconnect", () => {
          users = allRooms[roomName].filter((user) => user.id !== socket.id);
          io.emit("new user", users);
        });
      } else {
        socket.emit("refuse_connection");
      }

      socket.on("guessMade", (data) => {
        if (data) {
          io.to(roomName).emit("guessReceived", data);
        }
      });
      //emit drawing to the room
    });

    socket.on("beginTimer", (roomName) => {
      console.log("backend", roomName);
      const { gameCode } = roomName;
      console.log("gameCode", gameCode);
      if (allRooms[roomName].length === 2) {
        let timer = 60;
        let timerCountDown = setInterval(() => {
          io.to(gameCode).emit("timer", timer);
          timer--;
          if (timer === 0) {
            io.to(gameCode).emit("timer", "Time's up !");
            clearInterval(timerCountDown);
          }
        }, 1000);
      }
    });
  });
};
