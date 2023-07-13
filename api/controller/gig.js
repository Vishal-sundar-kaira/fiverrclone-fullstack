const createError = require("../utils/createError");
const Gig=require("../models/Gig.js")
exports.createGig = async(req, res,next) => {
    if(!req.isSeller) return next(createError(403,"Only sellers can create a gig!"))
    console.log(req.body.userid)
    const newGig=new Gig({
        ...req.body,
    }) 
    try{
        console.log(newGig);
        const savedGig=await newGig.save()
        res.status(201).json(savedGig)
    }catch(err){
        next(err)
    }
};
exports.deleteGig = async(req, res,next) => {
    try{
        const gig=await Gig.findById(req.params.id)
        if(gig.userid!==req.userId) return next(createError(403,"you can delete only your gig!"))
        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("gig has been deleted")
    }catch(err){
        next(err)
    }
};
exports.getGig = async(req, res,next) => {
    try{
        const gig=await Gig.findById(req.params.id)
        console.log(gig)
        if(!gig) next(createError(404,"Gig not found"))
        res.status(200).send(gig)
    }catch(err){
        next(err)
    }
};
exports.getGigs = async(req, res,next) => {
    const q=req.query
    const filters={//here you can filter and only show required outputs
        ...(q.cat&&{cat:q.cat}),//it means if q.cat is present then spread and allow cat but if not present q.cat then leave it.
        ...((q.min||q.max)&&{price:{...(q.min&&{$gt:q.min}),...(q.max&&{$lt:q.max})}}),
        ...(q.search&&{cat:{$regex:q.search,$options:"i"}}),//option i is for case sensitive it will not be case sesitive now.
        ...(q.userid&&{userid:q.userid})
    }
    try{
        const gigs=await Gig.find(filters).sort({[q.sort]:-1})
        console.log(gigs)
        res.status(200).send(gigs)
    }catch(err){
        next(err)
    }
};