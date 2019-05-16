const {
    fetchAllArticles,
    fetchArticleById,
    fetchArticleAndPatch,
    fetchCommentsByArticleId,
    postNewComment
} = require('../models/articleModels');

const getAllArticles = (req, res, next) => {
    fetchAllArticles(req.query)
        .then((articleData) => {
            res.status(200).send({ articles: articleData })
        })
        .catch(next);
};

const getArticleById = (req, res, next) => {
    fetchArticleById(req.params)
        .then((articleData) => {
            res.status(200).send({ article: articleData })
        })
        .catch(next)
}

const patchArticleById = (req, res, next) => {
    fetchArticleAndPatch(req.params, req.query)
        .then((articleData) => {
            res.status(200).send({ article: articleData })
        })
        .catch(next)
}

const getCommentsByArticleId = (req, res, next) => {
    fetchCommentsByArticleId(req.params, req.query)
        .then((commentsData) => {
            res.status(200).send({ comments: commentsData })
        })
        .catch(next)
}

const postCommenttoArticle = (req, res, next) => {
    postNewComment(req.params, req.query)
        .then((commentsData) => {
            res.status(200).send({ comments: commentsData })
        })
        .catch(next)
}

module.exports = {
    getAllArticles,
    getArticleById,
    patchArticleById,
    getCommentsByArticleId,
    postCommenttoArticle
};