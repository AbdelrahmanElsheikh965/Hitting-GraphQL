const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    // Id is automatically added by MongoDB server.
    name: {
      required: false,
      type: String,
    },
  },
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
