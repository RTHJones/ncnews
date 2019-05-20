const { changeVote, commentDeleter } = require('../models/commentModels')


const voteOnCommentById = (req, res, next) => {
    changeVote(req.params, req.query)
        .then((commentData) => {
            //if (!req.query.inc_votes) return Promise.reject({ status: 400, msg: 'Please enter Patch Data' })
            //else {
            res.status(200).send({ comment: commentData[0] })
            //}
        })
        .catch(next);
}

const deleteCommentById = (req, res, next) => {
    commentDeleter(req.params)
        .then((commentData) => {
            console.log('The following comment has been deleted:', commentData)
            if (commentData[0]) {
                res.status(204).send(commentData)
            }
            else {
                return Promise.reject({ status: 404, msg: 'Comment Not Found' })
            }
        })
        .catch(next);
}



module.exports = { voteOnCommentById, deleteCommentById }