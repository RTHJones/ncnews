const userRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { getUserByUsername } = require('../controllers/userController')



userRouter
    .route('/')
    .get((req, res) => res.send('userRouter doing fine'))
    .all(methodNotAllowed);

userRouter
    .route('/:username')
    .get(getUserByUsername)
    .all(methodNotAllowed)

module.exports = userRouter