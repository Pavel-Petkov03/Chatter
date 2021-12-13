const jwt = require("jsonwebtoken")


export function generateAccessToken(payload){
    jwt.sign(payload , env.ACCESS_TOKEN_SECRET)
}