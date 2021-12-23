const bcrypt  = require("bcrypt")

import User from "../models/user.js"


export default async function register(req , res) {
    const {password , email , username , confirmPassword} = req.body
    if(!email){
        // going to make email validation
        return res.send(401).json({
            message : "Email must be valid email"
        })
    }
    if(password !== confirmPassword){
        return res.send(401).json({
            message : "Password and confirm password must match"
        })
    }
    if(username.length < 6 || username.length > 20){
        res.status(401).json({
            message : "Username must be between 6 and 20 symbols exclusive"
        })
    }
    const user = new User({
        password : await bcrypt.hash(password, 10),
        username,
        email
    })
    await user.save()
}