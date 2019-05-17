const { fetchUserByUsername } = require('../models/userModels')

const getUserByUsername = (req, res, next) => {
    fetchUserByUsername(req.params)
        .then((userData) => {
            if (userData[0]) {
                res.status(200).send({ user: userData })
            }
            else {
                return Promise.reject({ reason: 'username not found', status: 404, msg: `User: ${req.params.username} does not exist.` })
            }
        })
        .catch(next)
};



module.exports = { getUserByUsername }