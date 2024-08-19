const express = require('express')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const router = express.Router()
const pool = require('../startup/db')
const { sendVerificationEmail } = require('../util/mailer')

router.post('/', async (req, res) => {
    const user = req.body

    // Hash the password to make it complex and unreadable
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)

    // Generate a 64-character long random string
    const verId = crypto.randomBytes(32).toString('hex')

    // Add user to database
    const client = await pool.connect(undefined) // Get a client from the pool
    const result = await client.query('INSERT INTO users (email, password, token) VALUES ($1, $2, $3) RETURNING id', [user.email, user.password, verId])
    const userId = result.rows[0].id
    client.release() // Release the client back to the pool

    // Send email to the email address provided by the user
    await sendVerificationEmail(user.email, verId)

    // Create the json web token and send it to the client
    const token = jwt.sign({
        id: userId,
        verified: false // New users are always unverified
    }, process.env.JWT_SECRET)

    res.send(token)
})

module.exports = router