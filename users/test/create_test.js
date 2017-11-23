let assert = require('assert');
const User = require('../src/user');

//describe(<string>, fn())
// contains a lot of it(<string>, fn())
describe('Creating records', () => {
    it('saves a user', (done) => {
        const joe = new User({
            name: 'Joe'
        });
        //save() is async operation from mongoose
        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            });
    })//saves a user
});