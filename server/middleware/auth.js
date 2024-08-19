const jwt = require('jsonwebtoken')
const pool = require('../startup/db')

module.exports = async (req, res, next) => {
    const token = req.headers.authorization // Get jwt sent by client

    // If user is logged in, decode the user's jwt and pass the decoded value onto the next middlewares
    if (token) {
        const user = jwt.verify(token, process.env.JWT_SECRET) // extract user info

        // Check if the user with the provided id exists in the database. If it doesn't, don't proceed
        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('SELECT id FROM users WHERE id = $1', [user.id])
        client.release() // Release the client back to the pool

        // Only proceed if the user with the provided id exists in the database
        if (result.rows.length > 0) {
            // Check if user still has unresolved email verification id. If they don't, pass the user to the next
            const token = result.rows[0].token
            if (!token) req.user = user
        }
    }

    next()
}