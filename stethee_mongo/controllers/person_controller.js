const Person = require('../models/Person');
const errorClass = require('./utils/error_handler')
module.exports = {
    greeting(req, res) {
        res.send({hi: 'therere'});
    },
    create(req, res, next) {
        const newPerson = {
            createdDate: new Date() / 1000,
            updatedDate: new Date() / 1000,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            phoneNumber: req.body.phoneNumber
        };
        Person.create(newPerson)
            .then((person) => res.send(person))
            .catch(err => res.send(errorClass.handleError(err.errors)))
    }
}
