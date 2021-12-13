 const jwt = require("jsonwebtoken")

 function verifyToken(req , res , next){
     const token = req.headers.authorization.split(" ")[1]
     try{
        if(!token){
            return res.status(401).json({
                message : "Invalid acess token"
            })
        }
        req.user = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET)
     }catch(er){
         console.log(er.message)
         return res.json({
             message : "Something went wrong"
         })
     }
     next()
 }

 module.exports = {
     verifyToken
 }