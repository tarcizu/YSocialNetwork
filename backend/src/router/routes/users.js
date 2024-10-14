const { Router } = require('express');

const { createUser, updateProfile, updatePassword } = require('../../controllers/userController');
const isLogged = require('../../middleware/isLogged');



const userRouter = Router();


userRouter.post('/', createUser);
userRouter.patch('/update/profile', isLogged, updateProfile);
userRouter.patch('/update/password', isLogged, updatePassword);





module.exports = userRouter;