const { fetchUserByUsername } = require('../models/userModels')

const getUserByUsername = (req, res, next) => {
    fetchUserByUsername(req.params)
        .then((userData) => {
            res.status(200).send({ user: userData })
        })
        .catch(next);
}


module.exports = { getUserByUsername }