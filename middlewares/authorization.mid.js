const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
require('dotenv').config()

const authorization = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET)
        User.findById(userId)
            .then((user) => {
                if (!user) {
                    throw new Error('User not found')
                }
                req.user = user
                next()
            })
            .catch((error) => {
                next(error)
            })
    } catch (error) {
        next(error)
    }
}

module.exports = authorization
