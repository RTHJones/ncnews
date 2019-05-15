const userRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');



userRouter
    .route('/')
    .get((req, res) => res.send('userRouter doing fine'))
    .all(methodNotAllowed);

module.exports = userRouter