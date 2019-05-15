const { fetchAllArticles } = require('../models/articleModels');

const getAllArticles = (req, res, next) => {

    fetchAllArticles(req.query)
        .then((articleData) => {
            console.log(articleData)
            res.status(200).send({ articles: articleData })
        })
        .catch(next);
};

module.exports = getAllArticles;