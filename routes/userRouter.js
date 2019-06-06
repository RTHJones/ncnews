const userRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { getUserByUsername, getAllUsers } = require('../controllers/userController')



userRouter
    .route('/')
    .get(getAllUsers)
    .all(methodNotAllowed);

userRouter
    .route('/:username')
    .get(getUserByUsername)
    .all(methodNotAllowed)

module.exports = userRouter