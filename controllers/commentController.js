const { fetchCommentById, changeVote, commentDeleter, checkCommentExists } = require('../models/commentModels')

const getCommentById = (req, res, next) => {
    let id = req.params.comment_id;
    fetchCommentById(id)
        .then(commentData => {
            if (commentData[0]) res.status(200).send({ comment: commentData })
            else return Promise.reject({ status: 404, msg: `Comment ${id} not found` })
        })
        .catch(next)
}

const voteOnCommentById = (req, res, next) => {
    let id = req.params.comment_id
    changeVote(req.params, req.body)
        .then((commentData) => {
            if (commentData[0]) {
                res.status(200).send({ comment: commentData[0] })
            } else {
                return Promise.reject({ status: 404, msg: `Comment ${id} not found, unable to vote` })
            }
        })
        .catch(next);
}

const deleteCommentById = (req, res, next) => {
    let id = req.params.comment_id
    commentDeleter(req.params)
        .then((commentData) => {
            console.log('The following comment has been deleted:', commentData)
            if (commentData[0]) {
                res.status(204).send(commentData)
            }
            else {
                return Promise.reject({ status: 404, msg: `Comment ${id} not found, unable to delete` })
            }
        })
        .catch(next);
}



module.exports = { getCommentById, voteOnCommentById, deleteCommentById }