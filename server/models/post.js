import {mongoose} from "../config/mongoose.js"
const Schema = mongoose.Schema

const postSchema = new Schema({
    content : String,
    likesCount : Number,
    userImage : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    postImage : String // these two images will be saved in firebase or cloudinary later
});



module.exports = mongoose.model('User', postSchema);