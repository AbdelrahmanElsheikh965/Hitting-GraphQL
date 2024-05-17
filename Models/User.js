const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Id is automatically added by MongoDB server.
    isActive: {
      required: true,
      type: Boolean,
    },
    age: {
      required: true,
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
