const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');
describe('Drivers controller', () => {
    it('post to /api/drivers creates a new driver', (done) => {
        Driver.count().then((count) => {
            request(app)
                .post('/api/drivers')
                .send({email: 'test@test.com'}) // this send() here is to make a post request
                // and along with other info like the emial JKSON
                .end(() => {
                    Driver.count().then((newCount) => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        });
    });

    it('put to /api/drivers edit a new driver', (done) => {
        const driver = new Driver({email: 't@t.com', driving: false});

        driver.save().then(() => {
            request(app)
                .put('/api/drivers/' + driver._id)
                .send({driving: true})
                .end(() => {
                    Driver.findOne({email: 't@t.com'})
                        .then(driver => {
                            assert(driver.driving === true);
                            done();
                        });
                })
        });
    });

    it('delete to /api/driver a driver', (done) => {
        const driver = new Driver({email: 'delete@test.com'});
        driver.save().then(() => {
            request(app)
                .delete('/api/drivers/' + driver._id)
                .end(() => {
                    /* Driver.findOne({email:'delete@test.com'}).then((driver)=>{
                         assert(driver=== null);
                         done();
                     });*/
                    Driver.count().then(newCount => assert(newCount === 0));
                    done();

                })
        })
    });

    it('gets geolocation /api/drivers', (done) => {
        const seatleDriver = new Driver({
            email: 'seattle@test.com',
            geometry: {type: 'Point', coordinates: [-122.4759902, 47.6147628]}
        });

        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: {type: 'Point', coordinates: [-80.253, 25.791]}
        });

        Promise.all([
            seatleDriver.save(),
            miamiDriver.save()
        ]).then(() => {
            request(app)
                .get('/api/drivers?lng=-80&lat=25')
                .end((err, response) => {
                assert(response.body.length === 1);
                assert(response.body[0].obj.email === 'miami@test.com');
                    console.log(response);
                    done();
                })
        })


    });
});