const {
    fetchAllArticles,
    fetchArticleById,
    fetchArticleAndPatch,
    fetchCommentsByArticleId,
    postNewComment
} = require('../models/articleModels');

//const numericInputTester = require('../db/utils')

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
            // if (!numericInputTester.test(req.params.article_id)) {
            //     return Promise.reject({ status: 400, msg: 'please enter a valid article id format - numbers only!' })
            // }
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