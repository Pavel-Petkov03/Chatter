const Post = require("../models/post.js")
const router = require("express").Router()


router.get("/posts", (req , res) => {
    const skip =  0
    const limit = 10
    Post.find().sort({creationDate : -1}).limit(limit).skip(skip).exec((error , data) => {
        if(error){
            console.log(error)
        }else{
            console.log(data)
            res.status(200).json({
                posts : data
            })
        }
    })
})


router.post("/posts", async (req, res) => {
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

module.exports = router