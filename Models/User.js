const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Id is automatically added by MongoDB server.
    isActive: {
      required: false,
      type: Boolean,
    },
    age: {
      required: false,
      type: Number,
    },
    name: {
      required: true,
      type: String,
    },
    email: {
      required: false,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      required: true,
      default: 'GUEST',
      enum: ['ADMIN', 'USER', 'GUEST'],  
      type: String,
    },
    posts: [
      {
        postId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Post',
        },
      },
    ],
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
