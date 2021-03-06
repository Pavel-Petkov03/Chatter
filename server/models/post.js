const {mongoose} = require("../config/mongoose.js")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    ownerId : Schema.Types.ObjectId,
    content : String,
    likes : [
        {userId : {type : Schema.Types.ObjectId}}
    ]
})


const postSchema = new Schema({
    ownerId : {type : Schema.Types.ObjectId , ref : "User"},
    content : String,
    likesArray : [{type : Schema.Types.ObjectId}],
    postImage : String,
    creationDate : {type : Date , default : Date.now()},
    comments : [commentSchema]
});





module.exports = mongoose.model('Post', postSchema);