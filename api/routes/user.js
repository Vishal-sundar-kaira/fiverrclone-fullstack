const express=require("express")
const router=express.Router();
const { deleteuser,getUser } = require("../controller/user.js");
const{verifytoken}=require("../middleware/jwt.js")
router.delete("/delete/:id",verifytoken,deleteuser)
router.get("/:id",getUser)

module.exports = router;