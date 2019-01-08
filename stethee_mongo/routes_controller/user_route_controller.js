const UserController = require('../controllers/user_controller');

module.exports = (app) => {
   app.get('/user', UserController.greeting)
}
