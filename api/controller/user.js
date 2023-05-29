const User = require("../models/User.js")
const jwt=require("jsonwebtoken")
const createError = require("../utils/createError.js")
exports.deleteuser=async(req,res,next)=>{
    const user=await User.findById(req.params.id)
        if(req.userId!=user._id.toString()){
            return next(createError(403,"you can delete only your account"))
        }
        await User.findByIdAndDelete(req.params.id);
        next(createError(200,"deleted"));
}