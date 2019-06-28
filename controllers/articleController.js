const {
    countArticles,
    fetchAllArticles,
    fetchArticleById,
    fetchArticleAndPatch,
    fetchCommentsByArticleId,
    postNewComment,
    checkArticleExists,
    fetchArticleAndDelete,
    deleteAllCommentsByArticleId,
    createNewArticle
} = require('../models/articleModels');



const getAllArticles = (req, res, next) => {
    countArticles(req.query)
        .then(articles => {
            req.query.totalCount = articles.length
        })
        .then(
            fetchAllArticles(req.query)
                .then((articleData) => {
                    if (articleData[0]) {
                        res.status(200).send({ total_count: req.query.totalCount, articles: articleData })
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
                .catch(next)
        )
        .catch(next)
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
    let id = req.params.article_id
    checkArticleExists(id)
        .then(articleData => {
            if (articleData[0]) {
                fetchCommentsByArticleId(req.params, req.query)
                    .then((commentsData) => {
                        if (!commentsData[0]) {
                            return Promise.reject({ status: 404, msg: `No comments found for article ${id}` })
                        } else {
                            res.status(200).send({ comments: commentsData })
                        }
                    })
                    .catch(next)
            }
            else {
                return Promise.reject({ status: 404, msg: `Article ${id} not found` })
            }
        })
        .catch(next)
}


const postCommenttoArticle = (req, res, next) => {
    let id = req.params.article_id;
    checkArticleExists(id)
        .then(articleData => {
            if (articleData[0]) {
                postNewComment(req.params, req.body)
                    .then((commentsData) => {
                        res.status(201).send({ comment: commentsData[0] })
                    })
                    .catch(next)
            } else {
                return Promise.reject({ status: 404, msg: `Article ${id} not found` })
            }
        })
        .catch(next)
}

const deleteArticleById = (req, res, next) => {
    let id = req.params.article_id;
    deleteAllCommentsByArticleId(id)
        .then(() => {
            fetchArticleAndDelete(id)
                .then(articleData => {
                    console.log(`The following article and its associated comments have been deleted (Article ${id})`, articleData)
                    if (articleData[0]) res.status(204).send(articleData)
                    else return Promise.reject({ status: 404, msg: `Article ${id} not found` })
                })
                .catch(next)
        })
        .catch(next)
}

const postNewArticle = (req, res, next) => {
    createNewArticle(req.body)
        .then(newArticleData => {
            if (newArticleData[0]) {
                console.log('New article created:', newArticleData[0])
                res.status(201).send({ 'New Article Created': newArticleData[0] })
            } else {
                return Promise.reject({ status: 422, msg: 'Unable to create article' })
            }
        })
        .catch(next)
}

module.exports = {
    getAllArticles,
    getArticleById,
    patchArticleById,
    getCommentsByArticleId,
    postCommenttoArticle,
    deleteArticleById,
    postNewArticle
};