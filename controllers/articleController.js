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
            if (articleData[0]) {
                res.status(200).send({ article: articleData })
            }
            else {
                return Promise.reject({ status: 404, msg: `Article number: ${req.params.article_id} does not exist` })
            }
        })
        .catch(next)
}

const patchArticleById = (req, res, next) => {
    if (!req.query) {
        return Promise.reject({ status: 422, msg: `Please enter data to patch to article ${req.params.article_id}` })
    }
    fetchArticleAndPatch(req.params, req.query)
        .then((articleData) => {
            if (!articleData[0]) {
                return Promise.reject({ status: 404, msg: `Article number: ${req.params.article_id} does not exist` })
            }
            else {
                res.status(200).send({ article: articleData })
            }
        })
        .catch(next)
}

const getCommentsByArticleId = (req, res, next) => {
    fetchCommentsByArticleId(req.params, req.query)
        .then((commentsData) => {
            if (!commentsData[0]) {
                return Promise.reject({ status: 404, msg: `No comments found for Article number: ${req.params.article_id}`})

            }
            else {
                res.status(200).send({ comments: commentsData })
            }
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