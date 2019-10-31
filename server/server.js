const io = require("socket.io")(1111);
const express = require("express");
const app = express();
const Server = require("http").Server(app);
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//cors 設定
const corsOptions = {
  origin: ["http://localhost:8080", "http://localhost:5000"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));

//import router
const authRoute = require("./routes/auth");

dotenv.config();

// connect to db
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connect to db");
  }
);

//Middleware
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);

Server.listen(8000);

// socket.io

const room = {};

const roomListServer = [];

var gameBoard = [];
io.on("connect", socket => {
  socket.on(
    "boardRecord",
    (
      board,
      selectrow,
      selectcolumn,
      selectdom,
      selectpiece,
      targetrow,
      targetcolumn,
      targetdom,
      targetpiece,
      roomName
    ) => {
      gameBoard = board;

      socket.to(roomName).emit("record", {
        gameBoard: gameBoard,
        selectrow: selectrow,
        selectcolumn: selectcolumn,
        targetrow: targetrow,
        targetcolumn: targetcolumn,
        selectdom: selectdom,
        targetdom: targetdom,
        selectpiece: selectpiece,
        targetpiece: targetpiece
      });
    }
  );

  socket.on("newuser", (theNewUser, roomName) => {
    if (room[roomName] == null) {
      socket.emit("NotExist");
    } else {
      socket.join(roomName);
      room[roomName][socket.id] = theNewUser;

      if (Object.keys(room[roomName]).length === 2) {
        socket.emit("gamestart", false);
        socket.emit(
          "start",
          `遊戲開始，由${room[roomName][socket.id]}先攻，為白方。`
        );
        socket
          .to(roomName)
          .emit(
            "start",
            `遊戲開始，由${room[roomName][socket.id]}先攻，為白方。`
          );
      } else if (Object.keys(room[roomName]).length > 2) {
        socket.emit("roomFull");
        delete room[roomName][socket.id];
      }
    }
  });

  socket.on("sendMsg", (msg, userid, roomName) => {
    socket.to(roomName).emit("recMsg", { msg, userid });
  });

  socket.on("gamewatch", (watch, turn, roomName) => {
    socket.to(roomName).emit("gamewatch", {
      watch: watch,
      turn: turn
    });
  });

  socket.on("roomCreated", roomName => {
    roomListServer.push(roomName);

    room[roomName] = {};
    socket.broadcast.emit("roomList", roomListServer);
  });

  socket.on("requestRoomList", () => {
    socket.emit("roomListServer", roomListServer);
  });

  socket.on("userLeave", roomName => {
    if (room[roomName][socket.id]) {
      socket.to(roomName).emit("disconnected");
      delete room[roomName][socket.id];
    }
  });

  socket.on("disconnect", () => {
    for (let roomName of roomListServer) {
      if (
        room[roomName][socket.id] &&
        (Object.keys(room[roomName]).length === 2 ||
          Object.keys(room[roomName]).length === 1)
      ) {
        socket.to(roomName).emit("disconnected");
        delete room[roomName][socket.id];
      }
    }
  });

  socket.on("pawnChange", data => {
    socket.to(data.room).emit("changePawn", data);
  });

  socket.on("whiteWin", roomName => {
    socket.to(roomName).emit("WhiteWin");
    socket.emit("WhiteWin");
  });
  socket.on("blackWin", roomName => {
    socket.to(roomName).emit("BlackWin");
    socket.emit("WhiteWin");
  });
});
