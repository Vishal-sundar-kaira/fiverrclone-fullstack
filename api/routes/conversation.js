const express=require("express")
const router=express.Router();
const { getConversations,createConversation,getSingleConversation,updateConversation } = require("../controller/conversation.js");
const{verifytoken}=require("../middleware/jwt.js")
router.get("/",verifytoken,getConversations)
router.post("/",verifytoken,createConversation)
router.put("/single/:id",verifytoken,getSingleConversation)
module.exports = router;