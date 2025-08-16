const bcrypt=require('bcrypt')
const User=require("../models/user-model")
const Home=async(req,res)=>{
    try{
        res.status(200).send("welcome to room from controller");
    }catch(error){
        console.log("page not found");
    }
}
const Register=async(req,res)=>{
    try{
        console.log(req.body);
        const {username,email,phone,password}=req.body;
        const Userexist=await User.findOne({email});
        if(Userexist){
            return res.status(400).json({message:"User already exists"});

        }
        //hash password
        // const saltaround=10;
        // const hash_password=await bcrypt.hash(password,saltaround)
        const usercreated=await User.create({username,email,phone,password});
        return res.status(201).json({
            msg:"Successfully Registered",
            token:await usercreated.generateToken(),
            userId:usercreated._id.toString(),
        });
    }catch(error){
        console.log("internal server error");
        //return res.status(500).json({message:"internal server error"});
        next(error);
        
    }
}
const Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const Userexist=await User.findOne({email});
        if(!Userexist){
            return res.status(401).json({message:"Invalid Credential"});
        }
        const user=await Userexist.comparepassword(password);
        if(user){
            return res.status(200).json({
            msg:"Successfully Loggedin",
            token:await Userexist.generateToken(),
            userId:Userexist._id.toString(),
            })
    }
        else{
            return res.status(400).json({message:"Invalid password"});
        }

    }catch(error){
        return res.status(500).json({message:"internal server error"})
    }
}
const user=async(req,res)=>{
    try{
        const userdata=req.user;
        console.log(userdata);
        return res.status(200).json({userdata});
    }catch(error){
        console.log(`error from user route ${error}`);
    }

}
module.exports={Home,Register,Login,user}