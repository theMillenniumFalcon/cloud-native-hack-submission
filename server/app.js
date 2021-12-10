require('dotenv').config({path: "./config.env"})
const express = require('express')
const authRoute = require('./routers/auth')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/auth', authRoute)

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})
