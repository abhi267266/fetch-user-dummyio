const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: String,
    image: String,
    likes: Number,
    tags: [String],
    text: String,
    publishDate: Date,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
