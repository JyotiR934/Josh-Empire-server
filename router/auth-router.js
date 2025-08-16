const express=require("express");
const router=express.Router();
const authcontroller=require("../controller/auth-controller")
const {signupSchema,loginSchema}=require("../validators/auth-validator")
const validate=require("../middlewares/validator-middleware")
const authmiddleware=require('../middlewares/auth-middleware')
// router.get("/",(req,res)=>{
//     res.status(200).send("welcome to room from router");
// })
// router.get("/register",(req,res)=>{
//     res.send("register here from router");
// })
router.route("/").get(authcontroller.Home);
router.route("/register").post(validate(signupSchema),authcontroller.Register);
router.route("/login").post(validate(loginSchema),authcontroller.Login);
router.route("/user").get(authmiddleware,authcontroller.user);
module.exports=router;