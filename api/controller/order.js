const createError = require("../utils/createError");
const Gig=require("../models/Gig.js")
const Order=require("../models/Order.js")
const Stripe = require("stripe")
exports.intent = async(req, res, next) => {
    // console.log("ok so its inside intent")
    try{
        const stripe=new Stripe(process.env.STRIPE)
        const gig=await Gig.findById(req.params.id)
        const alreadyorder=await Order.find({gigid:gig._id,buyerid:req.userId})
        console.log(alreadyorder)
        if(alreadyorder != null && alreadyorder.length > 0){
            return next(createError(400,"Already same gig ordered"))
        }
            const paymentIntent = await stripe.paymentIntents.create({
            amount: gig.price*100,
            currency: "inr",
            automatic_payment_methods: {
              enabled: true,
            },
          });
        

        // console.log(paymentIntent,"payementIntent is working")
        // after payment create order.
        console.log(paymentIntent.client_secret,"clientsecret is correct")
        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
          });
        // console.log(stripe,"ok stripe is working")
        const neworder=new Order({
            gigid:gig._id,
            buyerid:req.userId,
            sellerid:gig.userid,
            img:gig.cover,
            title:gig.title,
            price:gig.price,
            iscompleted:true,
            payement_intent:paymentIntent.id//paymentIntent.id

        })
        await neworder.save();
        console.log("order confirmed")

    }catch(err){

        next(err)
    }
};
exports.getOrders = async (req, res ,next) => {
    try{
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
