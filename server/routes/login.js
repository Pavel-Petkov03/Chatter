const bcrypt  = require("bcrypt")

import User from "../models/user.js"

export default async function login(req , res){
        const {email , password} = req.body
        const currentUser = await User.findOne({email}).exec()
        if(currentUser === null){
            return res.status(401).json({
                message : "There is not any user with that email"
            })
        }
        else if(bcrypt.compare(password , currentUser.password)){
            return res.status(401).json({
                message : "Incorrect password"
            })
        }
} 



