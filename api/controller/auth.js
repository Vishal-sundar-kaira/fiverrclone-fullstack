const User = require("../models/User.js")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")
exports.register = [
    body("email").isEmail().withMessage("Enter a valid email"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Handle validation errors
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const salt=await bcrypt.genSalt(10);
            const secpass=await bcrypt.hashSync(req.body.password,salt);
            const newUser = new User({
                ...req.body,
                password:secpass
            });
            await newUser.save();
            res.status(201).send("User has been created");
        } catch (err) {
            res.status(500).send("There is some error");
        }
    }
]
exports.login = [
    body("password").exists().withMessage("Enter a valid password"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Handle validation errors
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const user=await User.findOne({username:req.body.username})
            if(!user)
            {
                return res.status(400).send("user not found")
            }
            const iscorrect=bcrypt.compareSync(req.body.password,user.password)
            if(!iscorrect) return res.status(400).send("wrong password use correct password")
            // console.log("1")
            const token=jwt.sign(
            {
                id:user._id,
                isSeller:user.isSeller
            },process.env.JWT_KEY)
            // console.log("2")
            const {password,...info}=user._doc
            res.cookie("accessToken",token,{
                httpOnly:true,
            }).status(200).send(info)
            // console.log("3")
        } catch (err) {
            res.status(500).send("There is some error");
        }
    }
]
