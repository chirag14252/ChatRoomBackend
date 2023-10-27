

import mongoose, { Schema } from "mongoose";



const messageSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    message:{
      type:String,
      required:true
    },
    
},{timestamps:true});

const MessageModel = mongoose.model("userActivity",messageSchema);
export default MessageModel;