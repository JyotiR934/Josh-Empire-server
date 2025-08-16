const jwt=require("jsonwebtoken");
const User=require('../models/user-model');


const authmiddleware=async(req,res,next)=>{
    const token=req.header("Authorization");
   // console.log(token);
    if(!token){
        return res.status(401).json({msg:"unauthorized HTTP, Token not provided"});
    }
    const jwttoken=token.replace("Bearer","").trim();
    //console.log(jwttoken);
    try{
        const isverified=jwt.verify(jwttoken,process.env.JWT_SECRET_KEY,);
        //console.log(isverified);
        const userdata=await User.findOne({email:isverified.email}).select({password:0,});
        console.log(userdata);
        req.token=token;
        req.user=userdata;
        req.userID=userdata._id;
        next();
    }catch(error){
        return res.status(401).json({msg:"unauthorized. Invalid token."})
    }
}
module.exports=authmiddleware;