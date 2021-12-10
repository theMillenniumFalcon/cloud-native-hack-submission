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

    if(!email || !password) {
        return next(new ErrorResponse("Please provide an email and password!", 400))
    }

    try {

    } catch(error) {
        next(error)
    }
}

module.exports = {
    register, login
}