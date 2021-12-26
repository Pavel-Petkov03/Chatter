import {mongoose} from "../config/mongoose.js"
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  profilePicture : String // this will be changed to some cloud like firebase or cloudinary

});

userSchema.index(
  {
    email: 1,
  },
  {
    unique: true,
  },
);


module.exports = mongoose.model('User', userSchema);