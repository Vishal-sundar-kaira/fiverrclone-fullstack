const express=require("express")
const router=express.Router();
const {getOrders,intent,confirm } = require("../controller/order.js");
const{verifytoken}=require("../middleware/jwt.js")
router.get("/",verifytoken,getOrders)
router.post("/create-payment-intent/:id",verifytoken,intent)//taking gig id to get price.
router.put("/",verifytoken,confirm)

module.exports = router;