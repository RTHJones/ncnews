const { fetchAllUsers, fetchUserByUsername } = require('../models/userModels')

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



module.exports = { getAllUsers, getUserByUsername }