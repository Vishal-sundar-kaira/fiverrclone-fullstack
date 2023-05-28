const express=require("express")
const router=express.Router();
const { deleteuser } = require("../controller/user.js");
const{verifytoken}=require("../middleware/jwt.js")
router.delete("/delete/:id",verifytoken,deleteuser)

module.exports = router;