const { fetchAllArticles, fetchArticleById } = require('../models/articleModels');

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

module.exports = { getAllArticles, getArticleById };