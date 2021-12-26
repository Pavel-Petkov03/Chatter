const mongoose = require("../config/mongoose.js")
const Schema = mongoose.Schema

const commentSchema = new Schema({
    content : String,
    ownerImg : String,
    likesCount : {type : Number, default : 0},
});



module.exports = mongoose.model('Comment', commentSchema);