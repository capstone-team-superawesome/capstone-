let users = [];

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
        const host = users[0].id;
        socket.emit("new user", { users, host });

        //emit drawing to the room
        socket.on("drawing", (data) => {
          const { roomName } = data;
          socket.to(roomName).emit("drawing", data);
        });

        //listen for user disconnecting
        socket.on("disconnect", () => {
          users = users.filter((user) => user.id !== socket.id);
          io.emit("new user", users);
        });
      });

      socket.on("guessMade", (data) => {
        if (data) {
          io.emit("guessReceived", data);
        }
      });

      socket.on("beginTimer", (roomName) => {
        console.log("backend", roomName);
        const { gameCode } = roomName;
        console.log("gameCode", gameCode);
        if (users.length === 2) {
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
    }
  });
};
