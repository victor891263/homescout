const express = require('express')
require('dotenv').config()

const app = express()

const pool = require('./startup/db')

app.use('/auth', require('./routes/auth'))
app.use('/verify', require('./routes/verify'))
app.use(require('./middleware/auth')) // Authentication middleware
app.use('/properties', require('./routes/properties'))

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
