const assert = require('assert');
const User = require('../src/user');

describe('Deleting user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name: 'Joe'});
        joe.save().then(() => done());
    });

    it('deletes a single user using remove() model instance', (done) => {
        joe.remove()
            .then(() => {
                return User.findOne({name: 'Joe'});

            })
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('deletes a single user using remove() class model ', (done) => {
        User.remove({name: 'Joe'})
            .then(() => {
                return User.findOne({name: 'Joe'});
            })
            .then((user) => {
                assert(user === null);
                done();
            })
    });

    it('deletes a single user using findOneAndRemove()', (done) => {
        User.findOneAndRemove({name: joe.name})
            .then(() => {
                return User.findOne({name: 'Joe'});
            })
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('deletes a single user using findByIdAndRemove()', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => {
                return User.findOne({name: 'Joe'});
            })
            .then((user) => {
            assert(user === null);
            done();
            })
    });
});