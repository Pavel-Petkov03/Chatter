const Comment = require("../models/comment.js")
const Post = require("../models/post.js")
async function postComment(req , res){
    const {content , ownerImg, postId} = req.body
    try{
        const newComment = new Comment({
            content,
            ownerImg,
            postId
        })
        await newComment.save()
        return res.status(200).json({
            message : "Comment created successfully"
        })
    }catch(er){
        return res.status(404).json({
            errorMessage : er.message
        })
    }
}

async function patchComment(req , res){
    const commentId = req.body.commentId
    Comment.findOne(commentId , async (er , comment) => {
        if(er){
            return res.status(404).json({
                errorMessage : "Comment not found"
            })
        }
        comment.content = req.body.content
        await comment.save()
        return res.status(200).json({
                message : "Successfully patched comment"
        })
    })
}

async function deleteComment(req, res) {
    Comment.findByIdAndDelete(req.body.commentId , (er , data) => {
        if(er){
            return res.status(404).json({
                errorMessage : er.message
            })
        }
        return res.status(200).json({
            data
        })
    })
}

module.exports =  {
    patchComment,
    postComment,
    deleteComment
}