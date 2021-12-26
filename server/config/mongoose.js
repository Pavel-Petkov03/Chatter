require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("CONNECTED TO DATABASE SUCCESSFULLY")
}).catch(er => {
    console.log(er.message)
})

module.exports = {
    mongoose
}