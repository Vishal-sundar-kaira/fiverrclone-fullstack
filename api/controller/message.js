const createError = require("../utils/createError");
const Message=require("../models/Message.js")
const Conversation=require("../models/Conversation.js")
exports.createmessage = async(req, res, next) => {
    try{
        console.log(req.userId)
        const newmessage=new Message({
            Conversationid:req.body.conversationid,
            Userid:req.userId,
            desc:req.body.desc
        })
        const savemessage=await newmessage.save();
        await Conversation.findOneAndUpdate({id:req.body.conversationid},{
            $set:{
                Readbyseller:req.isSeller,
                Readbybuyer:!req.isSeller,
                lastmessage:req.body.desc,
            },
        },{new:true})
        res.status(200).send(savemessage);
    }catch(err){
        next(err)
    }
};
exports.getmessage = async(req, res, next) => {
    try{
        const messages=await Message.find({Conversationid:req.params.id})

        res.status(200).send(messages);
    }catch(err){
        next(err)
    }
};