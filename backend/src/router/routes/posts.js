const { Router } = require('express');

const { findPosts, createPost, findTimeline, findLikedPosts, findSavedPosts, addLikePost, removeLikePost, removeRepostPost, addRepostPost, addSavePost, removeSavePost, getPost } = require('../../controllers/postController');
const isLogged = require('../../middleware/isLogged');



const postRouter = Router();


postRouter.post('/', isLogged, findPosts);
postRouter.post('/create', isLogged, createPost);
postRouter.post('/timeline', isLogged, findTimeline);
postRouter.post('/likedposts', isLogged, findLikedPosts);
postRouter.post('/savedposts', isLogged, findSavedPosts);
postRouter.post('/:postID/like', isLogged, addLikePost);
postRouter.delete('/:postID/like', isLogged, removeLikePost);
postRouter.post('/:postID/repost', isLogged, addRepostPost);
postRouter.delete('/:postID/repost', isLogged, removeRepostPost);
postRouter.post('/:postID/save', isLogged, addSavePost);
postRouter.delete('/:postID/save', isLogged, removeSavePost);
postRouter.post('/:username/:postID', getPost);




module.exports = postRouter;