const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const pool = require('../startup/db')
const { sendPasswordResetEmail } = require('../util/mailer')

router.post('/', async (req, res) => {
    try {
        const email = req.params.email

        // Generate a 64-character long random string
        const resetId = crypto.randomBytes(32).toString('hex')

        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('UPDATE users SET reset_id = $1 WHERE email = $2 RETURNING id', [resetId, email])
        client.release() // Release the client back to the pool

        // If no user with the given email is found, return an error to the client
        if (result.rows.length === 0) return res.status(400).send('There is no user with the email provided')

        await sendPasswordResetEmail(email, resetId)
        res.status(200)
    } catch (err) {
        res.status(500).send('Failed to communicate with the database')
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const newPassword = req.body.password

        // Hash the password to make it complex and unreadable
        const salt = bcrypt.genSaltSync(10)
        const hashed = bcrypt.hashSync(newPassword, salt)

        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('UPDATE users SET password = $1, reset_id = NULL WHERE reset_id = $2 RETURNING id', [hashed, id])
        client.release() // Release the client back to the pool

        // If no user with the given reset id is found, return an error to the client
        if (result.rows.length === 0) return res.status(400).send('Your password reset link looks invalid')

        res.status(200)
    } catch (err) {
        res.status(500).send('Failed to communicate with the database')
    }
})

module.exports = router