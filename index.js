import express from "express";
import http from "http";
import { json } from "express";
import {Server} from "socket.io";
import cors from "cors";
const app = express();
app.use(json())
const PORT = 3000;
const serverInstance = http.createServer(app);
const io = new Server(serverInstance,{cors: {
    origin: '*',
  }});
//we have established a connection
io.on('connection',(socket)=>{
    //we are listening the events
   socket.on("chat",(payload)=>{
     io.emit("chat",payload);
   })
})

serverInstance.listen(PORT,()=>{
    console.log("server is running at the port "+PORT);
})