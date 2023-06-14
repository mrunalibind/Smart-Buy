let mongoose = require("mongoose")



let UserSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,require:true},
    role:{type:String,default:"user"}
},{
    versionKey:false
})


let UserModel = mongoose.model("user",UserSchema)


module.exports = {UserModel}