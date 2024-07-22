const { Router } = require('express');
const { availableTest } = require('../../controllers/testController');


const testRouter = Router();



testRouter.get('/', availableTest);

module.exports = testRouter;