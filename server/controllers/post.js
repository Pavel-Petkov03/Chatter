const Post = require("../models/post.js")


function getPosts(req , res)  {
    const skip =  0
    const limit = 10
    Post.find().sort({creationDate : -1}).limit(limit).skip(skip).exec((error , data) => {
        if(error){
            console.log(error)
        }else{
            res.status(200).json({
                posts : data
            })
        }
    })
}

async function createPost (req, res)  {
    const {content , userImage, postImage } = req.body
    // the pictures will be saved in cloud later
    // THIS IS ONLY FOR DEBUGGING
    const post = new Post({
        content,
        userImage,
        postImage
    })
    await post.save()
    res.json({
        message : "Post is created successfully",
        status : 200
    })
}


function patchPost (req , res)  {
    Post.findOne(req.params.postId , async (er , post) => {
        if(er){
            return res.status(404).json({errorMessage : er.message})
        }
        let {newContent} = req.body
        post.content = newContent
        await post.save()
        return res.status(204).json({
            post
        })
    })
}



function deletePost(req , res)  {
    Post.findOneAndDelete(req.params.postId , (er , data) => {
        if(er){
            return res.status(404).json({
                errorMessage : er.message
            })
        }
        return res.status(200).json({
            message : "Deleted post successfully",
            data
        })
    })
}

module.exports = {
    deletePost ,
    patchPost,
    getPosts,
    createPost
}