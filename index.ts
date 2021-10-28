const app = require("express");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: ["https://socket-frontend-3towjekr2q-ue.a.run.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;
let arr: String[] = [];
io.on("connection", (socket: any) => {
  console.log("New client connected", socket.id);
  arr.push(`${socket.id} is now connected! Total = ${io.engine.clientsCount}`);
  socket.emit("status", arr);
  
  socket.on("disconnect", () => {
    arr.push(`${socket.id} is now disconnected! total = ${io.engine.clientsCount}`);
    socket.emit("status", arr);
    console.log("Total : ", io.engine.clientsCount)
    if(io.engine.clientsCount === 0){
      arr = []
      console.log("Refreshing")
    }
  });
});

http.listen(PORT, () => {
  console.log("App running on 4000");
});
