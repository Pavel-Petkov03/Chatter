const Comment = require("../models/comment.js")

function postComment(req , res){
    const {content , ownerImg} = req.body
    try{
        const newComment = new Comment({
            content,
            ownerImg
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
    const commentId = req.params.commentId
    try{
        const currentComment = await Comment.findOne({_id : commentId})
        currentComment.content = req.body.content
        await currentComment.save()
        return res.status(200).json({
            message : "Successfully patched comment"
        })
    }catch(er){
        return res.status(404).json({
            errorMessage : "Comment not found"
        })
    }
}

async function deleteComment(req, res) {
    Comment.findByIdAndDelete(req.params.commentId , (er , data) => {
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

export {
    patchComment,
    postComment,
    deleteComment
}