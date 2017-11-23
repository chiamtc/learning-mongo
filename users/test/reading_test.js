const assert = require('assert');
const User = require('../src/user');
describe('Reading Test', () => {
    let joe, maria, alex, zach;

    beforeEach((done) => {
        alex = new User({name: 'Alex'});
        maria = new User({name: 'Maria'});
        zach = new User({name: 'Zach'});
        joe = new User({name: 'Joe'});

        Promise.all([
            alex.save(),
            joe.save(),
            maria.save(),
            zach.save()
        ]).then(() => {
            done();
        });

    });

    it('searches all users named Joe', (done) => {
        //find() -> find all users that match the criteria and return an array
        //findOne() -> find first user that matches criteria and return single record.

        User.find({name: 'Joe'})
            .then((users) => {
                //._id = ObjectId() class which encapsulates the ._id in mongoose/mongodb
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('searches specific ID', (done) => {
        User.findOne({_id: joe._id})
            .then((user) => {
                assert(user.name === 'Joe');
                assert(user.name !== 'Mark');
                done();
            })
    });

    it('can skip and limit result set', (done) => {
        User.find({})
        //name : 1 = asc order,  -1 = desc order
            .sort({name: 1})
            .skip(1)
            .limit(2)
            .then((users) => {
                assert(users.length === 2);
                assert(users[0].name ==='Joe');
                assert(users[1].name ==='Maria');
                done();
            })
    });
});