const mongoose = require('mongoose');
//nodemon = watch our tests
//use other library's Promise which is es6's promise instead of mongoose promise
mongoose.Promise = global.Promise;


//before only executes one time in test suite as global hook
before((done) => {
    mongoose.connect('mongodb://localhost:27017/user_test');
    mongoose.connection
        .once('open', () => {
            done();
        })
        .on('error', () => {
            console.warn('Warning', error);
            done();
        });
});


//global hook = usually run in this file before carrying the other test files
//a global hook - run test before each test
//done callback = each test has done callback, if a single test is done, it will go to next test.
beforeEach((done) => {
    //collections is all in lowercase
    const {users,comments,blogposts} = mongoose.connection.collections;
    users.drop(()=>{
        comments.drop(()=>{
            blogposts.drop(()=>{done();});
        });
    });
});