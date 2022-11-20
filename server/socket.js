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
    }
  });
};
