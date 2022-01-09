import { generateAccessToken } from "../auth/generateAccessToken.js"

const bcrypt  = require("bcrypt")
const User =  require("../models/user.js")

async function login(req , res){
        const {email , password} = req.body
        const user = await User.findOne({email}).exec()
        if(user === null){
            return res.status(401).json({
                message : "There is not any user with that email"
            })
        }
        else if(!bcrypt.compare(password , user.password)){
            return res.status(401).json({
                message : "Incorrect password"
            })
        }
        
        return res.status(200).json({
            message : "Successfully logged in",
            token : generateAccessToken(user._id)
        })
}


async function register(req , res) {
    const {password , email , username} = req.body
    try{
        const user = new User({
            password : await bcrypt.hash(password, 10),
            username,
            email
        })
        await user.save()
        return res.status(200).json({
            message : "successfully logged in",
            token : generateAccessToken(user._id) 
        })

    }catch(er){
        return res.status(401).json({
            errorMessage : "Not Authorised"
        })
    }
    
}


export {
    login , register
}