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
            if (articleData[0]) {
                res.status(200).send({ articles: articleData })
            }
            else {
                if (req.query.author) {
                    return Promise.reject({ status: 404, msg: 'Author not found' })
                }
                else if (req.query.topic) {
                    return Promise.reject({ status: 404, msg: 'Topic not found' })
                }
                else return Promise.reject({ status: 404, msg: 'Not Found' })
            }
        })
        .catch(next);
};


const getArticleById = (req, res, next) => {
    fetchArticleById(req.params)
        .then((articleData) => {
            if (articleData[0]) {
                res.status(200).send({ article: articleData[0] })
            }
            else {
                return Promise.reject({ status: 404, msg: `Article number: ${req.params.article_id} does not exist` })
            }
        })
        .catch(next)
}

const patchArticleById = (req, res, next) => {
    console.log(req.body)

    fetchArticleAndPatch(req.params, req.body)
        .then((articleData) => {
            if (!articleData[0]) {
                return Promise.reject({ status: 404, msg: `Article number: ${req.params.article_id} does not exist` })
            }
            else {
                res.status(200).send({ article: articleData[0] })
            }
        })
        .catch(next)

}

const getCommentsByArticleId = (req, res, next) => {
    fetchCommentsByArticleId(req.params, req.query)
        .then((commentsData) => {
            // if (!commentsData[0]) {
            //     return Promise.reject({ status: 200, msg: `No comments found for Article number: ${req.params.article_id}` })

            // }
            // else {
            res.status(200).send({ comments: commentsData })
            // }
        })
        .catch(next)
}

const postCommenttoArticle = (req, res, next) => {
    postNewComment(req.params, req.body)
        .then((commentsData) => {
            res.status(201).send({ comments: commentsData[0] })
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