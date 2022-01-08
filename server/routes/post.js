
const router = require("express").Router()
const postController = require("../controllers/post.js")
const { verifyToken } = require("../middlewares/auth.js")
const {validateContent , validateImage} = require("../validators/post.js")
const {validateEntries} = require("../middlewares/auth.js")



router.get("/", verifyToken, postController.getPosts)


router.post("/", (req , res , next) => {
    // this will be changed with cloudinary
    const {postImage , content} = req.body
    req.validators = [
        validateContent(content),
        validateImage(postImage)
    ]
    next()
} , validateEntries, verifyToken,  postController.createPost)


router.patch("/:postId" ,(req , res, next) => {
    req.validators = [validateContent(req.body.content)]
    next()
},  verifyToken ,  postController.patchPost)

router.delete("/:postId", verifyToken, postController.deletePost)


module.exports = router