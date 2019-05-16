const articleRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {
    getAllArticles,
    getArticleById,
    patchArticleById,
    getCommentsByArticleId,
    postCommenttoArticle
} = require('../controllers/articleController')

articleRouter
    .route('/')
    .get(getAllArticles)
    .all(methodNotAllowed);

articleRouter
    .route('/:article_id')
    .get(getArticleById)
    .patch(patchArticleById)
    .all(methodNotAllowed);

articleRouter
    .route('/:article_id/comments')
    .get(getCommentsByArticleId)
    .post(postCommenttoArticle)
    .all(methodNotAllowed);


module.exports = articleRouter;