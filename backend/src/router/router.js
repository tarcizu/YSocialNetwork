const { Router } = require('express');


const test = require('./routes/test');
const users = require('./routes/users');
const login = require('./routes/login');
const auth = require('./routes/auth');
const isLogged = require('../middleware/isLogged');

const routes = Router();




routes.use('/users', users);
routes.use('/', test);
routes.use('/login', login);
routes.use('/auth', auth);


module.exports = routes;