const { fetchAllTopics, createTopic } = require('../models/topicModels');

const getAllTopics = (req, res, next) => {
    fetchAllTopics()
        .then((topicData) => {
            res.status(200).send({ topics: topicData })
        })
        .catch(next);
};

const addNewTopic = (req, res, next) => {
    createTopic(req.body)
        .then(newTopicData => {
            if (newTopicData[0]) {
                res.status(201).send({ 'New Topic Created': newTopicData[0] })
            } else {
                return Promise.reject({ status: 422, msg: "Unable to create new topic" })
            }
        })
        .catch(next)
}

module.exports = { getAllTopics, addNewTopic }