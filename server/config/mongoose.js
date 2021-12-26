require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(env.process.MONGODB_CONNECTION_STRING).then(() => {
    console.log("CONNECTED TO DATABASE SUCCESSFULLY")
}).catch(er => {
    console.log(er.message)
})

module.exports = {
    mongoose
}