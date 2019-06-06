const { fetchAllUsers, fetchUserByUsername, addNewUser } = require('../models/userModels')

const getAllUsers = (req, res, next) => {
    fetchAllUsers(req.query)
        .then(usersData => {
            res.status(200).send({ users: usersData })
        })
        .catch(next)
}

const getUserByUsername = (req, res, next) => {
    fetchUserByUsername(req.params)
        .then((userData) => {
            if (userData[0]) {
                res.status(200).send({ user: userData[0] })
            }
            else {
                return Promise.reject({ status: 404, msg: `User: "${req.params.username}" not found.` })
            }
        })
        .catch(next)
};

const addUser = (req, res, next) => {
    addNewUser(req.body)
        .then(newUserData => {
            if (newUserData[0]) {
                console.log("The following user has been created: ", newUserData)
                res.status(201).send({ 'New User Created' : newUserData[0] })
            } else {
                return Promise.reject({status: 422, msg: "Failed to create new user"})
            }
        })
        .catch(next)
}


module.exports = { getAllUsers, getUserByUsername, addUser }