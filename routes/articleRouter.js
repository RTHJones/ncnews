const articleRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { getAllArticles, getArticleById } = require('../controllers/articleController')

articleRouter
    .route('/')
    .get(getAllArticles)
    .all(methodNotAllowed);

articleRouter
    .route('/:article_id')
    .get(getArticleById)
    .all(methodNotAllowed);


module.exports = articleRouter;