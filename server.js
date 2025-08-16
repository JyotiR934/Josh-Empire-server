require('dotenv').config();
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
const cors=require('cors');
const express= require("express");
const app=express();
const authrouter=require("./router/auth-router");
const connectDb=require("./utils/db")
const errormiddleware=require("./middlewares/error-middleware");
const contactrouter=require("./router/contact-router")
const servicerouter=require("./router/service-router");
const adminrouter=require("./router/admin-router");

const corsOption={
    origin:"https://josh-empire-client.vercel.app",
    methods:["GET", "POST", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials:true,
}


app.use(cors(corsOption));
app.options("*", cors(corsOption));

app.use(express.json());



app.use("/api/auth",authrouter);
app.use("/api/form",contactrouter);
app.use("/api/data",servicerouter);
app.use("/api/admin",adminrouter);


app.get("/",(req,res)=>{
    res.status(200).send("api is running...");
})
// app.get("/register",(req,res)=>{
//     res.send("register here");
// })
app.use(errormiddleware);
const port=4000;
connectDb().then(()=>{
//     app.listen(port,()=>{
//     console.log(`server running in port ${port}`);
// })
    console.log("Database connected successfully");
})


// connectDb().then(() => {
//   console.log("DB Connected");
// });
// (async () => {
//   try {
//     await connectDb();
//     console.log("Database connected");
//   } catch (err) {
//     console.error("Database connection failed:", err);
//   }
// })();


// module.exports = app;

