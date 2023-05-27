const mongoose=require('mongoose');
const {Schema}=mongoose;
const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    img:{
        type:String,//storing url
        required:false,
    },
    phone:{
        type:Number,
        required:true
    },
    desc:{
        type:String,
        required:false
    },
    isSeller:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
const User=mongoose.model('User',UserSchema)
module.exports=User