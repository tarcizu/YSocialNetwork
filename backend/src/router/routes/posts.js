const { Router } = require('express');

const { findPosts, createPost } = require('../../controllers/postController');
const isLogged = require('../../middleware/isLogged');



const postRouter = Router();


postRouter.post('/', isLogged, findPosts);
postRouter.post('/create', isLogged, createPost);





module.exports = postRouter;