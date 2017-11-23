const mongoose = require('mongoose');
const assert = require('assert');

const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
    let joe, blogPost;
    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        blogPost = new BlogPost({title: 'JS is Great', content: 'It really is!'});

        joe.blogPosts.push(blogPost);
        //all([]) executes in parallel
        Promise.all([
            joe.save(),
            blogPost.save(),
        ]).then(() => done());

    });

    it('users clean up dangling blogposts on remove', (done) => {
        joe.remove()
        //BlogPost collection to count how many in it
            .then(() => BlogPost.count())
            .then((count) => {
                assert(count === 0);
                done();
            });
    })
});