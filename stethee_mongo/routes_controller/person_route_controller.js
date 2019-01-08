const PersonController = require('../controllers/person_controller');

module.exports = (app) => {
    app.get('/user', PersonController.greeting)
    app.post('/user', PersonController.create)
}
