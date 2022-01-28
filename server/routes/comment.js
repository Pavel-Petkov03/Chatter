const commentsController = require("../controllers/comment.js")
const express = require("express")
const {verifyToken} = require("../middlewares/auth");

const router = express.Router()


router.post("/:postId" , verifyToken , commentsController.postComment)

router.patch("/:postId/:commentId" , verifyToken , commentsController.patchComment)
// patch has same validation logic as post


router.delete("/:postId/:commentId" , verifyToken , commentsController.deleteComment)


module.exports = router


