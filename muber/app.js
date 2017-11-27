const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect('mongodb://localhost/muber');
}
//assumming inc reqs are JSON then use it for the api-controller part
app.use(bodyParser.json());

//execute controller codes with router then use the next middleware #2
routes(app);


//#2 is the middleware to throw error msg as a response gracefully;
app.use((err, req, res, next) => {
    res.status(422).send({error: err.message});
});

module.exports = app;