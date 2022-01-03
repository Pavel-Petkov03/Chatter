const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const router = require("./routes/homePage.js")
app.use(express.json())
app.use(cookieParser())
app.use("/", router)
app.listen(5000, () => {
    console.log("Listening on post 5000")
})