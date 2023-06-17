const express=require("express")
const router=express.Router();
const { createOrder,getOrders } = require("../controller/order.js");
const{verifytoken}=require("../middleware/jwt.js")
router.post("/:gigid",verifytoken,createOrder)
router.get("/",verifytoken,getOrders)

module.exports = router;