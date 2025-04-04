const  { Schema } = require("mongoose");
const mongoose = require("mongoose");

const post = new Schema({
    text: { type: String, required: true },
    image: { type: String, required: false },
    author: { type: String, required: true },
    comments: Array,
});

const Post = mongoose.model('Post',post);

module.exports = Post;