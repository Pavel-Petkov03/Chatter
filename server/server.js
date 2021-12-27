const express = require("express")
const app = express()
const router = require("./routes/homePage.js")
app.use(express.json())
app.use("/", router)
app.listen(5000, () => {
    console.log("Listening on post 5000")
})