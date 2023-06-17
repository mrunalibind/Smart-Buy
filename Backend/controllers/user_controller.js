const {User}=require("../Models/user_model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const registerNewUser=async(req,res)=>{
    try {
        const {email,password,name,role}=req.body;
        const isUserPresent=await User.findOne({email});
        if(isUserPresent) return res.send("User find");
        const hash= bcrypt.hashSync(password,8);
        const newUser=new User({name,email,password:hash,role})
        await newUser.save();
        res.send("singup successful")
    } catch (error) {
        res.send(error.message)
    }
}

module.exports={
    registerNewUser
}