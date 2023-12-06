const express=require("express")
const router=express.Router();
const { getConversations,createConversation,getSingleConversation,updateConversation } = require("../controller/conversation.js");
const{verifytoken}=require("../middleware/jwt.js")
router.get("/",verifytoken,getConversations)
router.post("/create",verifytoken,createConversation)
router.get("/single/:id",verifytoken,getSingleConversation)
router.put("/:id",verifytoken,updateConversation)
module.exports = router;