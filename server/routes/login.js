const bcrypt  = require("bcrypt")
const User =  require("../models/user.js")

async function login(req , res){
        const {email , password} = req.body
        const currentUser = await User.findOne({email}).exec()
        if(currentUser === null){
            return res.status(401).json({
                message : "There is not any user with that email"
            })
        }
        else if(!bcrypt.compare(password , currentUser.password)){
            return res.status(401).json({
                message : "Incorrect password"
            })
        }

        return res.status(200).json({
            message : "Successfully logged in"
        })
}



