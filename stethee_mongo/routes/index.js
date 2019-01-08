/*
var express = require('express');
var router = express.Router();

/!* GET home page. *!/
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

module.exports = router;
*/

const UserRouteController = require('../routes_controller/user_route_controller')

module.exports = (app) => {
    UserRouteController (app);
}
