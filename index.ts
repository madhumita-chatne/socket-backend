const app = require("express");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const arr: String[] = [];
io.on("connection", (socket: any) => {
  console.log("New client connected", socket.id);
  //
  arr.push(`${socket.id} is now connected`);
  socket.broadcast.emit("status", arr);
  socket.on("disconnect", () => {
    arr.push(`${socket.id} is now disconnected`);
    socket.broadcast.emit("status", arr);
  });
});

http.listen(4000, () => {
  console.log("App running on 4000");
});
