const {mongoose} = require("../config/mongoose.js")
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  profilePicture : String //
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