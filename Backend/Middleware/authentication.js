
require('dotenv').config()
let authenticate = async(req,res,next)=>{

    if(req.query.password == process.env.password){
             next()
    }else{
        res.status(500).send({msg:"only admin can access this routes"})
    }

}


module.exports = {authenticate}