const { connect } = require('getstream')
const  bcrypt = require('bcrypt')
const StreaamChat = require('stream-chat')
const crypto = require('crypto')
const ErrorResponse = require('../utils/errorResponse')

const API_KEY = process.env.STREAM_API_KEY
const API_SECRET = process.env.STREAM_API_SECRET
const API_ID = process.env.STREAM_API_ID

const register = async (req, res, next) => {
    const { fullName, username, password, phoneNumber } = req.body
    try {
        const userId = crypto.randomBytes(16).toString('hex')
        const serverClient = connect(API_KEY, API_SECRET, API_ID)

        const hashedPassword = await bcrypt.hash(password, 10)

        const token = serverClient.createUserToken(userId)
        res.status(200).send({ token, fullName, username, userId, hashedPassword, phoneNumber })
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    const { username, password } = req.body

    if(!username || !password) {
        return next(new ErrorResponse("Please provide an username and password", 400))
    }

    try {
        const serverClient = connect(API_KEY, API_SECRET, API_ID)
        const client = StreaamChat.getInstance(API_KEY, API_SECRET)

        const { users } = await client.queryUsers({ name: username})

        if(!users.length) {
            return next(new ErrorResponse("User not found", 400))
        }

        const success = await bcrypt.compare(password, users[0].hashedPassword)

        const token = serverClient.createUserToken(users[0].id)

        if (success) {
            res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id })
        } else {
            return next(new ErrorResponse("Incorrect password", 400))
        }

    } catch(error) {
        next(error)
    }
}

module.exports = {
    register, login
}