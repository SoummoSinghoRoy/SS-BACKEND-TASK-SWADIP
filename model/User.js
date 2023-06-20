const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6
  },
  role: {
    type: String,
    required: true,
    set: (value) => {
      return value.toUpperCase();
    }
  }
})

const User = model('User', UserSchema);

module.exports = User;