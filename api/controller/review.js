const createError = require("../utils/createError");
const Gig=require("../models/Gig.js");
const Review=require("../models/review.js")
exports.createReview = async(req, res,next) => {
    try{
        if(req.isSeller){
            return next(createError(403,"Sellers cant create Reviews!"))
        }
        const newReview= new Review({
            userid:req.userId,
            gigid:req.body.gigid,
            desc:req.body.desc,
            star:req.body.star
        })
        const review=await Review.findOne({userid:req.userId,gigid:req.body.gigid});//if same person reviewed already for same gig dont allow another.
        if(review){
            next(createError(403,"you can't Enter two Reviews to same gig"))
        }
        else{
            const savedReview=await newReview.save();
            //update gig stars also by increment.
            await Gig.findByIdAndUpdate(req.body.gigid,{$inc:{totalStars:req.body.star,starNumber:1}});
            res.status(201).send(savedReview);
        }     
    }catch(err){
        next(err);
    }
};
exports.getReviews= async(req, res,next) => {
    console.log("connected to getreview")
    console.log(req.params.id);
    const reviews=await Review.find({gigid:req.params.id})
    if(!reviews){
        next(createError(404,"No Reviews"));
    }
    else{
        res.send(reviews);
    }
};
exports.deleteReview = async(req, res,next) => {
    try{
        const reviews=await Review.findOneAndDelete({gigid:req.params.id,userid:req.userId});
        await Gig.findByIdAndUpdate(req.params.gigid,{$dec:{totalStars:reviews.star,starNumber:-1}});
    }
    catch(err){
        next(err);
    }

};