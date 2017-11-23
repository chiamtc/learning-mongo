const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('requires a user name', (done) => {
        const user = new User({name: undefined});
        //validateSync() = synchronous validation
        // validate(callbackFn() =>{}) = for callback Fn which is for asynchronous ops
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name; // == validationResult.errors.name.message but in es6;
        assert(message === 'Name is required.');
        done();
    });

    it('requires user name more than 2 characters', (done) => {
        const user = new User({name: 'Al'});
        const validationResult = user.validateSync();
        const {message} = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.');
        done();
    });

    it('disallows invalid records from being saved', (done) => {
        const user = new User({name: 'Al'});
        user.save()
            .catch((validationResult) => {
                const {message} = validationResult.errors.name;
                assert(message === 'Name must be longer than 2 characters.');
                done();
            });
    })
});