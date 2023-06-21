const createError = require("../utils/createError");
const Gig=require("../models/Gig.js")
const Order=require("../models/Order.js")
const Stripe = require("stripe")
exports.intent = async(req, res, next) => {
    try{
        const stripe=new Stripe(process.env.STRIPE)
        const gig=Gig.findById(req.params.id)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: gig.price*100,
            currency: "inr",
            automatic_payment_methods: {
              enabled: true,
            },
        })
        //after payment create order.
        const neworder=new Order({
            gigid:gig._id,
            buyerid:req.userId,
            sellerid:gig.userid,
            img:gig.cover,
            title:gig.title,
            price:gig.price,
            payement_intent:paymentIntent.id

        })
        await neworder.save();
        res.status(200).send({
            clientSecret:paymentIntent.client_secret,
        })
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
exports.confirm = async (req, res ,next) => {
    try{
        //so we need to search on the basis of if i am seller or buyer
        const orders=await Order.findOneAndUpdate({payement_intent:req.body.payement_intent},{$set:{
            iscompleted:true,
        }})
        res.status(200).send("Orders has been confirmed!");
    }catch(err){
        next(err)
    }
};
