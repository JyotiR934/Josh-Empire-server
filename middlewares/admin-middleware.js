const adminMiddleware=async(req,res,next)=>{
    try{

        console.log("getting in adminMiddleware",req.user);
        // const isAdmin=req.user.isadmin;
        // console.log(isAdmin);
        const userdetail=req.user;
        // console.log(userdetail.isadmin);
        const adminRole=userdetail.isadmin;
        if(!adminRole){
            return res.status(403).json({message:"Access denied as user is not admin"})
        }
        // return res.status(200).json(userdetail.isadmin);
        next();
    }catch(error){
        next(error);
    }
}
module.exports=adminMiddleware;