const {mongoose} = require("../config/mongoose.js")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    ownerId : Schema.Types.ObjectId,
    content : String,
    ownerImg : {type : String , ref : "User"},
    likesCount : {type : Number, default : 0},
});



module.exports = mongoose.model('Comment', commentSchema);