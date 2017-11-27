const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('the express app', () => {
    //install supertest package
    it('handles a GET request to /api', (done) => {
        request(app) //use supertest library with app
            .get('/api') //types of request
            .end((err, res) => {

                assert(res.body.hi === 'there');
                done();
            })
    });
});