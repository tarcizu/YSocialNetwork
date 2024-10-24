const { Router } = require('express');


const test = require('./routes/test');
const users = require('./routes/users');
const login = require('./routes/login');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const user = require('./routes/user');
const search = require('./routes/search');

const routes = Router();




routes.use('/users', users);
routes.use('/', test);
routes.use('/login', login);
routes.use('/auth', auth);
routes.use('/posts', posts);
routes.use('/user', user);
routes.use('/search', search);


module.exports = routes;