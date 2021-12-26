import {mongoose} from "../config/mongoose.js"
const Schema = mongoose.Schema

const postSchema = new Schema({
    content : String,
    likesCount : {type : Number, default : 0},
    userImage : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    postImage : String,// these two images will be saved in firebase or cloudinary later
    creationDate : Date 
});



module.exports = mongoose.model('User', postSchema);