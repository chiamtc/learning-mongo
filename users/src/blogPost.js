const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    content: String,
    //referring to model instead of schema
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
});

const BlogPost = mongoose.model('blogPost', BlogPostSchema);

module.exports = BlogPost;