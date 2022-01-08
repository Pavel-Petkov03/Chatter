const {mongoose} = require("../config/mongoose.js")
const Schema = mongoose.Schema

const postSchema = new Schema({
    content : String,
    likesCount : {type : Number, default : 0},
    userImage : { type: String, ref: 'User' },
    postImage : String,// these two images will be saved in firebase or cloudinary later
    creationDate : {type : Date , default : Date.now()},
    commentsArray : [{type : Object}]
});



module.exports = mongoose.model('Post', postSchema);