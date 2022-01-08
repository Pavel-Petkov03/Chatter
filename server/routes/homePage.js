const Post = require("../models/post.js")
const router = require("express").Router()


router.get("/", (req , res) => {
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
})


router.post("/", async (req, res) => {
    console.log(req.body)
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
})


router.patch("/:postId" , (req , res) => {
    let {newContent} = req.body
    let postId = req.params.postId
    try{
        const currentPost = await Post.findOne({_id : postId})
        if(currentPost !== null){
            currentPost.content = newContent
            await currentPost.save()
            return res.status(204).json({
                post : currentPost
            })
        }
    }catch(er){
        return res.status(404).json({errorMessage : "Something went wrong"})
    }
})

router.delete("/:postId", (req , res) => {
    let postId = req.params.postId
    try{
        Post.findOneAndDelete({_id : postId})
        return res.status(200).json({
            message : "Deleted post successfully"
        })
    }catch(er){
        return res.status(404).json({
            errorMessage : er.message
        })
    }
})


module.exports = router