const commentRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');



commentRouter
    .route('/')
    .get((req, res) => res.send('you have reached commentRouter. All good here!'))
    .all(methodNotAllowed);

module.exports = commentRouter