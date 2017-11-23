const PostSchema = require('./post');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        //add validate property with object of must-have validator() and message
        //more on that http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [true, 'Name is required.']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{type: Schema.Types.ObjectId, ref: 'blogPost'}]
});

//adding virtual property to userschema
// to set what this virtual porperty does use .get(function(){});
//this .get() = getter from es6 to get a reference of postCount from joe
UserSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

//middleware
//pre('save') look for remove events on pre removing event occurs
UserSchema.pre('remove', function (next) {
    //to pull blogPost model instead of importing one
    const BlogPost = mongoose.model('blogPost');

    BlogPost.remove({_id: {$in: this.blogPosts}})
        .then(()=> next())
});

const User = mongoose.model('user', UserSchema);

module.exports = User;