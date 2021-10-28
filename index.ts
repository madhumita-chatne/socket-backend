// 
const app = require("express");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "https://socket-frontend-3towjekr2q-ue.a.run.app"],
    methods: ["GET", "POST"],
  },
});
let arr: String[] = [];
io.on("connection", (socket: any) => {
  console.log("New client connected", socket.id);
  //
  arr.push(`${socket.id} is now connected! Total = ${io.engine.clientsCount}`);
  socket.broadcast.emit("status", arr);
  socket.on("disconnect", () => {
    arr.push(`${socket.id} is now disconnected! Total = ${io.engine.clientsCount}`);
    socket.broadcast.emit("status", arr);

    if(io.engine.clientsCount === 0 ){
      console.log("Refreshing")
      arr = []
    }
  });
});

const port = process.env.PORT!;
http.listen(port, () => {
  console.log("App running on ", port);
});
