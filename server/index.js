const express = require('express')
require('express-async-errors')
require('dotenv').config()
const cors = require('cors')

const app = express()

app.use(cors({
    exposedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Catch errors or promises that are missed
process.on('uncaughtException', (error, source) => console.log('uncaughtException', error, source))
process.on('unhandledRejection', (error, source) => console.log('unhandledRejection', error, source))

const pool = require('./startup/db')

app.use('/auth', require('./routes/auth'))
app.use('/reset', require('./routes/reset'))
app.use('/verify', require('./routes/verify'))
app.use(require('./middleware/auth')) // Authentication middleware
app.use('/properties', require('./routes/properties'))
app.use('/users', require('./routes/users'))
app.use(require('./middleware/error'))

function shutdown() {
    pool.end(() => {
        console.log('Pool has ended')
        process.exit(0)
    })
}

// Close the pool app is shut down or interrupted
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running!')
})
