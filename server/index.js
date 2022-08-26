const express = require("express");
const app = express();
const cors = require("cors");

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT;

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

// ! Middlewares
app.use(express.json());
app.use(cors());

// ? Importing routes
const router = require("./routes/router");
const { callbackify } = require("util");
app.use(router);

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name} sohbete katıldı!`,
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} sohbete katıldı!`,
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    let user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} sohbetten ayrıldı.`,
      });
    }
  });
});

// * Starting server
server.listen(PORT || 5000, () => {
  console.log("Server listening on port " + PORT);
});
