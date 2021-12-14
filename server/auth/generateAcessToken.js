const jwt = require("jsonwebtoken")


function verifyToken(req , res , next){
    const token = req.headers.authorization.split(" ")[1]
    try{
        if(!token){
            res.status(401).json({
                message : "Not authorized"
            })
        }
        jwt.verify(token , env.process.ACCESS_TOKEN_KEY)
    }catch(er){
        return res.json({
            message : "Not authorized"
        })
    }
    next()
}


module.exports = {
    verifyToken    
}