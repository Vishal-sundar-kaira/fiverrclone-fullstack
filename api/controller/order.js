const createError = require("../utils/createError");
const Gig=require("../models/Gig.js")
const Order=require("../models/Order.js")
exports.createOrder = async(req, res, next) => {
    try{
        const gig= await Gig.findById(req.params.gigid);
        const neworder=new Order({
            gigid:gig._id,
            buyerid:req.userId,
            sellerid:gig.userid,
            img:gig.cover,
            title:gig.title,
            price:gig.price,
            payement_intent:"temporary"

        })
        await neworder.save();
        res.status(200).send("Success");
    }catch(err){
        next(err)
    }
};
exports.getOrders = async (req, res ,next) => {
    try{
        //so we need to search on the basis of if i am seller or buyer
        const orders=await Order.find({
            ...(req.isSeller?{sellerid:req.userId}:{buyerid:req.userId}),
            iscompleted:true
        })
        res.status(200).send(orders);
    }catch(err){
        next(err)
    }
};