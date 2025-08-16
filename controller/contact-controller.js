const Contact=require("../models/contact-model");
const contactController=async(req,res)=>{
   try{
     const contact=req.body;
    await Contact.create(contact);
    return res.status(200).json({msg:"Message sent successfully"});
   }catch(error){
    return res.status(400).json({msg:"Message not delivered"});
   }
}
module.exports=contactController;