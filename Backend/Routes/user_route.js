const {registerNewUser}=require("../controllers/user_controller")
const userRouter=require("express").Router();

userRouter.post("/res",registerNewUser);

module.exports={userRouter}