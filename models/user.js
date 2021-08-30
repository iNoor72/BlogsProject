const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  followers: {
    type: Number,
    required: true,
  },
  bio: {
    type: String,
    required: true
  },
}, { timestamps: true });

const UserInfo = mongoose.model('UserInfo', userSchema);
module.exports = UserInfo;