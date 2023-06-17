const express=require("express");

const{connection}=require("./config/db")
const {userRouter}=require("./Routes/user_route")
const cors=require("cors")

require("dotenv").config();

const app=express()

const port=process.env.PORT || 8000;

app.use(express.json());
app.use(cors())
app.use("/user",userRouter)

app.listen(port,async(req,res)=>{
    try {
        await connection
        
        console.log("Listening on "+port)
    } catch (error) {
        console.log(error.message)
    }
})
