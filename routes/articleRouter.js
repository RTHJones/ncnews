const articleRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const getAllArticles = require('../controllers/articleController')

articleRouter
    .route('/')
    .get(getAllArticles)
    .all(methodNotAllowed);


module.exports = articleRouter;