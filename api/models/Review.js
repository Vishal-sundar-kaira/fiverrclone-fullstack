const mongoose=require('mongoose');
const {Schema}=mongoose;
const ReviewSchema=new Schema({
    gigid:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    star:{
        type:Number,
        enum:[1,2,3,4,5],
        required:true
    },
    desc:{
        type:String,
        required:true
    },
},{timestamps:true})
const Review=mongoose.model('Review',ReviewSchema)
module.exports=Review