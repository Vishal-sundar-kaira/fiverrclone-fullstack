const express=require("express")
const router=express.Router();
const { deleteuser } = require("../controller/user.js");
router.delete("/delete/:id",deleteuser)

module.exports = router;