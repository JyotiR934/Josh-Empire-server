const mongoose=require("mongoose");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isadmin:{
        type:Boolean,
        default:false
    }
})
UserSchema.pre("save",async function(next){
    //console.log("pre:",this);
    const user=this;
    if(!user.isModified('password')){
        next();
    }
    try{
        const saltaround=await bcrypt.genSalt(10);
        const hash_password=await bcrypt.hash(user.password,saltaround)
        user.password=hash_password;
    }catch(error){
        next(error);
    }
})
UserSchema.methods.generateToken=async function(){
    try{
        return jwt.sign(
        {
            userId:this._id.toString(),
            email:this.email,
            isadmin:this.isadmin,
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn:"30d",
        }
        )
    }catch(error){
        console.error(error);
    }
}
UserSchema.methods.comparepassword=async function(password){
    
    return bcrypt.compare(password,this.password);
    
}
const User=new mongoose.model("User",UserSchema);
module.exports=User;