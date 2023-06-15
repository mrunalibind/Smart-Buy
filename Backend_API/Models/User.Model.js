let mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"User"}

})


let userModel = mongoose.model('user',UserSchema)

module.exports=  userModel