const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const comment = new Schema({
    content: String,
    author: String,
    postId: String
});

const Comment = mongoose.model('Comment',comment);

module.exports = Comment;