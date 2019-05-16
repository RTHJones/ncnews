const commentRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { voteOnCommentById, deleteCommentById } = require('../controllers/commentController')



commentRouter
    .route('/')
    .get((req, res) => res.send('you have reached commentRouter. All good here!'))
    .all(methodNotAllowed);

commentRouter
    .route('/:comment_id')
    .patch(voteOnCommentById)
    .delete(deleteCommentById)
    .all(methodNotAllowed)

module.exports = commentRouter