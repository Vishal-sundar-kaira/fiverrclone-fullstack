const createError = require("../utils/createError");
const Gig=require("../models/Gig.js")
const Order=require("../models/Order.js")
const Conversation=require("../models/Conversation.js")
exports.createConversation = async(req, res, next) => {
    try{
        console.log("convo backend linked correctly")
        const newConversation=new Conversation({
            id:req.isSeller?req.userId+req.body.to:req.body.to+req.userId,
            sellerid:req.isSeller?req.userId:req.body.to,
            buyerid:req.isSeller?req.body.to:req.userId,
            Readbyseller:req.isSeller,
            Readbybuyer:!req.isSeller,

        })
        console.log(newConversation+"save")
        const savedConversation=await newConversation.save();

        res.status(200).send(savedConversation);
    }catch(err){
        next(err)
    }
};
exports.getSingleConversation = async(req, res, next) => {
    try{
        console.log('conversation')
        const conversation=await Conversation.findOne({id:req.params.id})
        if(!conversation) return next(createError(404,"Not found"))
        res.status(200).send(conversation);
    }catch(err){
        next(err)
    }
};
exports.getConversations = async(req, res, next) => {
    try{
        const conversations=await Conversation.find(req.isSeller?{sellerid:req.userId}:{buyerid:req.userId}).sort({updatedAt:-1})
        console.log(conversations.buyerid,req.userId)
        res.status(200).send(conversations);
    }catch(err){
        next(err)
    }
};
exports.updateConversation = async(req, res, next) => {
    try{
        const updatedconversation=await Conversation.findOneAndUpdate({id:req.params.id},{
            $set:{
                ...(req.isSeller?{Readbyseller:true}:{Readbybuyer:true}),
            }
        },{new:true})//compulsary to return updated conversations.
        res.status(200).send(updatedconversation);
    }catch(err){
        next(err)
    }
};