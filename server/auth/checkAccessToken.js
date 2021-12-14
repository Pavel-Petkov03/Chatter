const jwt = require("jsonwebtoken")


export function generateAccessToken(payload){
    jwt.sign(payload , env.process.ACCESS_TOKEN_SECRET)
}