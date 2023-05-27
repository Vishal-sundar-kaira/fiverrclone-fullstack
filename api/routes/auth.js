const express=require("express")
const router=express.Router();

const {register,login}=require("../controller/auth.js");
const { deleteuser } = require("../controller/user.js");
router.post("/register",register)
router.post("/login",login)
// router.post("/logout",logout)


module.exports = router;