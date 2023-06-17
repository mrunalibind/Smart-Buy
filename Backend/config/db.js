// const mongoose=require("mongoose")
// require("dotenv").config();
// const connection = () => mongoose.connect(process.env.MONGO_URL);
// module.exports=connection;

let mongoose = require("mongoose")
require('dotenv').config()

let connection = mongoose.connect(process.env.MONGO_URL)


module.exports = {connection}