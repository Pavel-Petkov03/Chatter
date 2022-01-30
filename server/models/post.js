const {mongoose} = require("../config/mongoose.js")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    userId : Schema.Types.ObjectId,
    content : String,
    ownerImage : String, // this will be url to cloudinary
    likes : [
        {userId : {type : Schema.Types.ObjectId}}
    ]
})


const postSchema = new Schema({
    ownerId : {type : String , ref : "User"},
    content : String,
    likesArray : [{type : Schema.Types.ObjectId}],
    ownerImage : { type: String, ref: 'User' },
    postImage : String,// these two images will be saved in firebase or cloudinary later
    creationDate : {type : Date , default : Date.now()},
    comments : [commentSchema]
});





module.exports = mongoose.model('Post', postSchema);