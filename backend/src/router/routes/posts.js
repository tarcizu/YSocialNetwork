const { Router } = require('express');

const { findPosts } = require('../../controllers/postController');
const isLogged = require('../../middleware/isLogged');



const postRouter = Router();


postRouter.post('/', isLogged, findPosts);





module.exports = postRouter;