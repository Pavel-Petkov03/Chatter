const  {generateAccessToken} =  require("../auth/generateAccessToken.js")

const bcrypt  = require("bcrypt")
const User =  require("../models/user.js")

async function login(req , res){
        console.log(req.body)
        const {email , password} = req.body
        console.log(email)
        const user = await User.findOne({email}).exec()
        if(user === null){
            return res.status(401).json({
                errorMessage : "There is not any user with that email"
            })
        }
        else if(!bcrypt.compare(password , user.password)){
            return res.status(401).json({
                errorMessage : "Incorrect password"
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
            errorMessage : "successfully logged in",
            token : generateAccessToken(user._id) 
        })

    }catch(er){
        return res.status(401).json({
            errorMessage : "Not Authorised"
        })
    }
    
}


module.exports =  {
    login , register
}