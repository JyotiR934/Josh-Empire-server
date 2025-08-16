const validate  =(schema)=>async(req,res,next)=>{
try{
    console.log("getting body data inside validate :",req.body);
    const parseBody=await schema.parseAsync(req.body);
    console.log("Parsed body:",parseBody);
    req.body=parseBody
    next();
}catch(err){
    console.log(err)
    const status=400;
     const message=err.issues.map((curElem) => curElem.message);
     console.log(message)
     //return res.status(400).json({msg:message })
    
    const error={
        status,
        message
    }
    next(error);

  
}
}
module.exports=validate