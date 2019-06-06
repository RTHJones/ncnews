const articleRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const {
    getAllArticles,
    getArticleById,
    patchArticleById,
    deleteArticleById,
    getCommentsByArticleId,
    postCommenttoArticle,
    postNewArticle
} = require('../controllers/articleController')

articleRouter
    .route('/')
    .get(getAllArticles)
    .post(postNewArticle)
    .all(methodNotAllowed);

articleRouter
    .route('/:article_id')
    .get(getArticleById)
    .patch(patchArticleById)
    .delete(deleteArticleById)
    .all(methodNotAllowed);

articleRouter
    .route('/:article_id/comments')
    .get(getCommentsByArticleId)
    .post(postCommenttoArticle)
    .all(methodNotAllowed);


module.exports = articleRouter;