let express = require("express")
let app = express()
let {UserRouter} = require("./Routers/user.router")
let {connection} = require("./db")
require('dotenv').config()

app.use(express.json())

app.use('/user',UserRouter)



app.listen(process.env.port, async()=>{

    try{

   connection
   console.log('mongodb is running')

    }catch(err){
        console.log(err)
    }

    console.log("server is running")

})