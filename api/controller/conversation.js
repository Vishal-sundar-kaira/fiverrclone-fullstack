const createError = require("../utils/createError");
const Gig=require("../models/Gig.js")
const Order=require("../models/Order.js")
const Conversation=require("../models/Conversation.js")
exports.createConversation = async(req, res, next) => {
    try{
        const newConversation=new Conversation({
            id:req.isSeller?req.userId+req.body.to:req.body.to+req.userId,
            sellerid:req.isSeller?req.userId:req.body.to,
            buyerid:req.seller?req.body.to:req.userId,
            Readbyseller:req.isSeller,
            Readbybuyer:!req.isSeller,

        })
        const savedConversation=await newConversation.save();

        res.status(200).send(savedConversation);
    }catch(err){
        next(err)
    }
};
exports.getSingleConversation = async(req, res, next) => {
    try{
        const conversation=await Conversation.findOne({id:req.params.id})

        res.status(200).send(conversation);
    }catch(err){
        next(err)
    }
};
exports.getConversations = async(req, res, next) => {
    try{
        const conversations=await Conversation.find(req.isSeller?{sellerid:req.userId}:{buyerId:req.userId})

        res.status(200).send(conversations);
    }catch(err){
        next(err)
    }
};
exports.updateConversation = async(req, res, next) => {
    try{
        const updatedconversation=await Conversation.findOneAndUpdate({id:req.params.id},{
            $set:{
                Readbyseller:req.isSeller,
                Readbybuyer:!req.isSeller
            }
        },{new:true})//compulsary to return updated conversations.
        res.status(200).send(updatedconversation);
    }catch(err){
        next(err)
    }
};