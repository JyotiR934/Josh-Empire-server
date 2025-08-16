const errormiddleware=(err,req,res,next)=>{
    const status=err.status ||500;
    const message=err.message || "Internal server error";
    const extramessage=err.extramessage ||"Error from backend";
    return res.status(status).json({message,extramessage})
}
module.exports=errormiddleware;