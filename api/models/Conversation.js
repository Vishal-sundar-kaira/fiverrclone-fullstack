const mongoose=require('mongoose');
const {Schema}=mongoose;
const ConversationSchema=new Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    sellerid:{
        type:String,
        required:true
    },
    buyerid:{
        type:String,
        required:true
    },
    Readbyseller:{
        type:String,
        required:true
    },
    lastmessage:{
        type:String,
        required:false
    },
},{timestamps:true})
const Conversation=mongoose.model('Conversation',ConversationSchema)
module.exports=Conversation