const { fetchAllArticles } = require('../models/articleModels');

const getAllArticles = (req, res, next) => {

    fetchAllArticles()
        .then((articleData) => {
            console.log(articleData)
            res.status(200).send({ articles: articleData })
        })
        .catch(next);
};

module.exports = getAllArticles;