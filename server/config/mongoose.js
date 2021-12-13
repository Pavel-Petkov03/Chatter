require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/chatter").then(() => {
    console.log("CONNECTED TO DATABASE SUCCESSFULLY")
}).catch(er => {
    console.log(er.message)
})

module.exports = {
    mongoose
}