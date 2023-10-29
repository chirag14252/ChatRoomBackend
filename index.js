import express from "express";
import http from "http";
import { json } from "express";
import {Server} from "socket.io";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MessageModel from "./Models/Message.js";
dotenv.config();
const app = express();

app.use(json());
app.use(cors());
const PORT = process.env.PORT||3000;
const mongoDB_URL = process.env.URL_MONGO;
mongoose.connect(`${mongoDB_URL}`).then(()=>{
  console.log("database connected successfully");
})



const serverInstance = http.createServer(app);
const io = new Server(serverInstance,{cors: {
    origin: '*',
  }});
//we have established a connection
io.on('connection',(socket)=>{
    // console.log(socket.id + "$");
    // const address = socket.handshake.query["address"];
    //we are listening the events
   socket.on("chat",(payload)=>{
     io.emit("chat",payload);
   })
})

app.post("/userActivity",(req,res)=>{
  const username = req.body.username;
  const message = req.body.message;
  MessageModel.create({
    username,message
  }).then((data,err)=>{
  if(data){
    return res.status(201).json({
      message:"message sent successfully"
    })
  }
  if(err){
    return res.status(500).json({
      message:"server side errot"
    })
  }
  })
});



app.get("/getMessage",(req,res)=>{
 MessageModel.find().then((data,err)=>{
  return res.status(200).json(
    {
      message:data
    }
  )
 })
})


app.get("/",(req,res)=>{
  return res.send("your server is running fine");
})
serverInstance.listen(PORT,()=>{
    console.log("server is running at the port "+PORT);
})



