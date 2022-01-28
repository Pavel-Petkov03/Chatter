
const Post = require("../models/post.js")
async function postComment(req , res){
    // todo make middleware for validating picture
    const postId = req.params.postId
    const {content , ownerImg} = req.body
    try{
        const currentPost = await Post.findById(postId)
        currentPost.comments.push({
            content , ownerImg
        })
        await currentPost.save()
        res.status(200).json({
            data : currentPost
        })
    }catch (er){
        res.status(404).json({
            errorMessage: er.message
        })
    }

}

async function patchComment(req , res){
    const {commentId , postId } = req.params
    const {content} = req.body
    const filter = `${postId}.comments.id`
    const setter = `${postId}.comments.$.content`
    await Post.findOneAndUpdate({[filter] : commentId}, {$set : {[setter] : content}}, {new : true} , (er , data) => {
        if(er){
            console.log(er)
        }else{
            res.status(201).json({
                data
            })
        }
    })
}

async function deleteComment(req, res) {
    const {commentId , postId } = req.params
    Post.findByIdAndUpdate({_id : postId} , {$pull : {comments : commentId}}, {new : true}, (er , data) => {
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
