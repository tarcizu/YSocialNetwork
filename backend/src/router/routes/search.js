const { Router } = require('express');
const isLogged = require('../../middleware/isLogged');
const { searchTerm, searchHashtag } = require('../../controllers/searchController');




const searchRouter = Router();


searchRouter.post('/', isLogged, searchTerm);
searchRouter.post('/hashtag', isLogged, searchHashtag);








module.exports = searchRouter;