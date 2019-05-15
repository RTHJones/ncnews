const { fetchAllTopics } = require('../models/topicModels');

const getAllTopics = (req, res, next) => {

    fetchAllTopics()
        .then((topicData) => {

            res.status(200).send({ topics: topicData })
        })
        .catch(next);
};

module.exports = getAllTopics;