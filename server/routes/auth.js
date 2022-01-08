const authController = require("../controllers/auth.js")
const router = require("./homePage")
const {authenticateEntries} = require("../middlewares/auth.js")


router.post("/login" , authController.login)
router.post("/register" , authController.register)




module.exports = router