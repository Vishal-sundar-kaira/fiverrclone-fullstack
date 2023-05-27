const mongoose=require('mongoose');
const {Schema}=mongoose;
const OrderSchema=new Schema({
    gigid:{
        type:String,
        required:true
    },
    buyerid:{
        type:String,
        required:true
    },
    sellerid:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:false
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    iscompleted:{
        type:Boolean,
        default:false
    },
    payement_intent:{
        type:String,
        required:true
    },
},{timestamps:true})
const Order=mongoose.model('Order',OrderSchema)
module.exports=Order