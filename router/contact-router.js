const express=require("express");
const router=express.Router();
const contactcontroller=require("../controller/contact-controller")
router.route("/contact").post(contactcontroller);
module.exports=router;