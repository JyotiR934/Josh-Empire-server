const Service=require("../models/service-model");
const service=async(req,res)=>{
    try{
        const response=await Service.find();
        if(!response){
            return res.status(404).json({msg:"No service found"});
        }
        return res.status(200).json({msg:response});
    }catch(error){
        console.log(`Services:${error}`);
    }
}
module.exports=service;