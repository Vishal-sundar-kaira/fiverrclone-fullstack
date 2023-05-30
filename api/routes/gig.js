const express=require("express")
const {createGig,deleteGig,getGig,getGigs}=require("../controller/gig.js")
const{verifytoken}=require("../middleware/jwt.js")
const router=express.Router();
router.post("/createGig",verifytoken,createGig)
router.delete("/delete/:id",verifytoken,deleteGig)
router.get("/single/:id",verifytoken,getGig)
router.get("/",verifytoken,getGigs)


module.exports = router;