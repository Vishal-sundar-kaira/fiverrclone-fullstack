const express=require("express")
const router=express.Router();
const { createmessage,getmessage } = require("../controller/message.js");
const{verifytoken}=require("../middleware/jwt.js")
router.post("/",verifytoken,createmessage)
router.get("/:id",verifytoken,getmessage)

module.exports = router;