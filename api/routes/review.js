const express=require("express")
const router=express.Router();
const{verifytoken}=require("../middleware/jwt.js")
const { createReview,getReviews,deleteReview } = require("../controller/review.js");
router.post("/",verifytoken,createReview);
router.get("/:id",getReviews);
router.post("/delete/:id",verifytoken,deleteReview);

module.exports = router;