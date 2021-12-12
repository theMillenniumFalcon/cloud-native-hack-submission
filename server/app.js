require('dotenv').config({path: "./config.env"})
const express = require('express')
const authRoute = require('./routes/auth')
const cors = require("cors")
const corsOptions = {
    origin:'*', 
    credentials:true,
    optionSuccessStatus:200,
}

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID
const twilioClient = require('twilio')(accountSid, authToken)

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors(corsOptions))

app.post('/', (req, res) => {
    const { message, user: sender, type, members } = req.body;

    if(type === 'message.new') {
        members
            .filter((member) => member.user_id !== sender.id)
            .forEach(({ user }) => {
                if(!user.online) {
                    twilioClient.messages.create({
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: messagingServiceSid,
                        to: user.phoneNumber
                    })
                        .then(() => console.log('Message sent!'))
                        .catch((err) => console.log(err))
                }
            })

            return res.status(200).send('Message sent!')
    }
    return res.status(200).send('Not a new message request')
})

app.use('/auth', authRoute)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})
