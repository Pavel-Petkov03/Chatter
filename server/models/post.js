const {mongoose} = require("../config/mongoose.js")
const Schema = mongoose.Schema

const postSchema = new Schema({
    ownerId : Schema.Types.ObjectId,
    content : String,
    likesArray : [{type : Schema.Types.ObjectId}],
    ownerImg : { type: String, ref: 'User' },
    postImage : String,// these two images will be saved in firebase or cloudinary later
    creationDate : {type : Date , default : Date.now()},
    comments : [
        {
            _id : Schema.Types.ObjectId,
            userId : Schema.Types.ObjectId,
            content : String,
            likes : [
                {userId : Schema.Types.ObjectId}
            ]
        }
    ]
});



module.exports = mongoose.model('Post', postSchema);