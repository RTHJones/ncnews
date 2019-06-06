const topicRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { getAllTopics, addNewTopic } = require('../controllers/topicController');

topicRouter
    .route('/')
    .get(getAllTopics)
    .post(addNewTopic)
    .all(methodNotAllowed);

module.exports = topicRouter;