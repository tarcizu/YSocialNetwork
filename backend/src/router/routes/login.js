const { Router } = require('express');
const { login } = require('../../controllers/userController');


const loginRouter = Router();



loginRouter.post('/', login);

module.exports = loginRouter;