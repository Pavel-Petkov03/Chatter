const authController = require("../controllers/auth.js")
const router = require("./homePage")
const {authenticateEntries} = require("../middlewares/auth.js")
const {validateMatchingPasswords , validatePasswordLen , validateUsername} = require("../validators/register.js")

router.post("/login" ,  authController.login)
router.post("/register" , (req , res, next) => {
    const {username , password , confirmPassword , email} = req.body
    req.validators = [
        validateMatchingPasswords(password , confirmPassword),
        validateUsername(username),
        validatePasswordLen(password)
    ]
    next()
},authenticateEntries ,authController.register)




module.exports = router