const assert = require('assert');
const User = require('../src/user');

describe('Update user records', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe', likes:0});
        joe.save().then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => {
                return User.find({});
            })
            .then((users) => {
                assert(users[0].name !== 'Joe');
                assert(users[0].name === 'Alex');
                done();
            });
    }

    //save and straight into db
    it('updates with model instance update()', (done) => {
        assertName(joe.update({name: 'Alex'}), done);
    });

    //saving a piece of information of the user
    it('updates with model instance set() and save()', (done) => {
        //set(<property>, <new value>); = only set in model not in db
        joe.set('name', 'Alex');
        //save new model
        assertName(joe.save(), done);
    });

    it('updates with class based update()', (done) => {
        //this update(criteria, newvalue) -> find all name = joe then update to alex di8fferent from model instance update();
        assertName(User.update({name: 'Joe'}, {name: 'Alex'}), done);
    });

    it('updates with class based findOneAndUpdate()', (done) => {
        assertName(User.findOneAndUpdate({name: 'Joe'}, {name: 'Alex'}), done);
    });

    it('updates with class based findByIdAndUpdate()', (done) => {
        assertName(User.findByIdAndUpdate(joe._id, {name: 'Alex'}), done);
    });

    //xit() = skip it temporarily
    it('A user can have their likes incremented by 1', (done) => {
        //find name called Joe then use operator with its attribute by how much (1 or -1 or more);
        // update( {attr_field:'value'}, {$inc: {attr_field:value}})
        User.update({name: 'Joe'}, {$inc: {likes: 1}})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user.likes === 1);
                done();
            })
    });
});