const { Router } = require('express');
const auth = require('../../controllers/authController');
const isLogged = require('../../middleware/isLogged');


const authRouter = Router();



authRouter.post('/', isLogged, auth);

module.exports = authRouter;