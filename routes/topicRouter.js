const topicRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const getAllTopics = require('../controllers/topicController');

topicRouter
    .route('/')
    .get(getAllTopics)
    .all(methodNotAllowed);

module.exports = topicRouter;