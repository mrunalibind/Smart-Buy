let mongoose = require("mongoose")
require('dotenv').config()

let connection = mongoose.connect(process.env.mongodb)


module.exports = {connection}