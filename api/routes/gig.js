const express=require("express")
const router=express.Router();
const { deleteuser } = require("../controller/user.js");
router.get("/test",deleteuser)

module.exports = router;