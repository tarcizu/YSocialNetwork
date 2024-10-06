const { Router } = require('express');

const { getProfile, getTimeline, getFollowers, getFollowing } = require('../../controllers/profileController');
const hasUser = require('../../middleware/hasUser');
const { addUserFollower, removeUserFollower } = require('../../controllers/userController');
const isLogged = require('../../middleware/isLogged');




const userRouter = Router();


userRouter.post('/profile/:username', hasUser, getProfile);
userRouter.post('/timeline/:id', hasUser, getTimeline);
userRouter.post('/follow/:id', isLogged, addUserFollower);
userRouter.post('/unfollow/:id', isLogged, removeUserFollower);
userRouter.post('/following/:id', isLogged, getFollowing);
userRouter.post('/followers/:id', isLogged, getFollowers);






module.exports = userRouter;