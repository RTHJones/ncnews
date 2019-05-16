const { changeVote, commentDeleter } = require('../models/commentModels')


const voteOnCommentById = (req, res, next) => {
    changeVote(req.params, req.query)
        .then((commentData) => {
            res.status(200).send({ comment: commentData })
        })
        .catch(next);
}

const deleteCommentById = (req, res, next) => {
    commentDeleter(req.params)
        .then((commentData) => {
            res.status(204).send({comment:commentData, result: `comment ${req.paramscomment_id} deleted`})
        })
        .catch(next);
}



module.exports = { voteOnCommentById, deleteCommentById }