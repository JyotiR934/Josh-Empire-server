require('dotenv').config();
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
const mongoose=require('mongoose');
const URI=process.env.MONGODB_URI;
console.log("Mongo URI:", URI);

const connectDb=async(req,res)=>{
    try{
         await mongoose.connect(URI);
         console.log("connected to mongodb atlas");
    }catch(error){
        console.log("Database connection failed")
    }
   
}
module.exports=connectDb;