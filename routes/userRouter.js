const userRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { getUserByUsername, getAllUsers, addUser } = require('../controllers/userController')



userRouter
    .route('/')
    .get(getAllUsers)
    .post(addUser)
    .all(methodNotAllowed);

userRouter
    .route('/:username')
    .get(getUserByUsername)
    .all(methodNotAllowed)

module.exports = userRouter