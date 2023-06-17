const {User}=require("../Models/user_model");
const bcrypt=require("bcrypt");
//const jwt=require("jsonwebtoken");

const registerNewUser=async(req,res)=>{
    const {email,name,password,role}=req.body;
    try {
        // const {email,password,name,role}=req.body;
        // const isUserPresent=await User.findOne({email});
        // if(isUserPresent) return res.send("User find");
        // const hash= await bcrypt.hash(password,8);
        // const newUser=new User({name,email,password:hash,role})
        // await newUser.save();
        const isUserPresent =await User.findOne({email})
        if(isUserPresent)return res.send("User find")
        const hash=bcrypt.hash(password,8)
        const newUser =new User({name,email,password:hash,role})
        await newUser.save()
        res.send("singup successful")
    } catch (error) {
        res.send(error.message)
    }
    // try{
    //     bcrypt.hash(password, 5, async (err, hash) => {
    //         if(err)res.send({"msg":err.message})
    //         else{
    //             const user=new User({name,email,password:hash,role})
    //         await user.save()
    //         res.status(200).send({"msg":"Registration has been done!"})
    //         }
    //     });
    // }catch(err){
    //     res.status(400).send({"msg":err.message})
    // }
}

module.exports={
    registerNewUser
}