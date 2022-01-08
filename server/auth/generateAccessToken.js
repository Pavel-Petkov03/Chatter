const jwt = require("jsonwebtoken")

function generateAccessToken(userId) {
    return jwt.sign({ sub: userId }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TIME,
    });
  }

module.exports = {
    generateAccessToken    
}