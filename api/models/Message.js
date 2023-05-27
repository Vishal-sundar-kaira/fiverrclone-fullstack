const mongoose=require('mongoose');
const {Schema}=mongoose;
const MessageSchema=new Schema({
    Conversationid:{
        type:String,
        required:true,
    },
    Userid:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }

},{timestamps:true})
const Message=mongoose.model('Message',MessageSchema)
module.exports=Message