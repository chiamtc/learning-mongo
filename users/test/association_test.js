const User = require('../src/user');
const assert = require('assert');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association...', () => {
    let joe, blogPost, comment;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'JS is Great', content: 'It really is!'});
        comment = new Comment({content: 'Great Post'});

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;
        //all([]) executes in parallel
        Promise.all([
            joe.save(),
            blogPost.save(),
            comment.save()
        ]).then(() => done());

    });


    //it.only() , only executes this it() in the entire test suites
    it.only('saves a relation between a user and a blogpost', (done) => {
        User.findOne({name: 'Joe'})
        //blogPosts = the attribute blogPosts in User model
            .populate('blogPosts')
            .then((user) => {
            console.log(user);
                assert(user.blogPosts[0].title === 'JS is Great');
                done();
            })
    });

    it('saves a full relation tree', (done) => {
        User.findOne({name: 'Joe'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.blogPosts[0].title === 'JS is Great');
                assert(user.blogPosts[0].comments[0].content === 'Great Post');
                assert(user.blogPosts[0].comments[0].user.name === 'Joe');
                done();
            });
    });
});
