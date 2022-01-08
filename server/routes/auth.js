const authController = require("../controllers/auth.js")
const router = require("./post")
const {authenticateEntries} = require("../middlewares/auth.js")
const {validateMatchingPasswords , validatePasswordLen , validateUsername} = require("../validators/register.js")
const validator = require("email-validator")


router.post("/login" ,  authController.login)


router.post("/register" , (req , res, next) => {
    const {username , password , confirmPassword , email} = req.body
    req.validators = [
        validateMatchingPasswords(password , confirmPassword),
        validateUsername(username),
        validatePasswordLen(password),
        validator.validate(email)
    ]
    next()
},authenticateEntries ,authController.register)




module.exports = router