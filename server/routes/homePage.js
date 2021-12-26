const Post = require("../models/post.js")
const router = require("express").Router()


router.get("/", (req , res) => {
    const skip =  0
    const limit = 10
    Post.sort({creationDate : -1}).limit(limit).skip(skip).exec((error , data) => {
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

module.exports = router