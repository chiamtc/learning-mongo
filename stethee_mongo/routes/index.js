/*
var express = require('express');
var router = express.Router();

/!* GET home page. *!/
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

module.exports = router;
*/

const PersonRouteController = require('../routes_controller/person_route_controller')

module.exports = (app) => {
    app.get('/', (req,res)=>{
        res.send('index')
    });
    PersonRouteController (app);
}
