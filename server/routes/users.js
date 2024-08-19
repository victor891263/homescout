const express = require('express')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const router = express.Router()
const pool = require('../startup/db')
const access = require('../middleware/access')
const { sendVerificationEmail } = require('../util/mailer')

router.post('/', async (req, res) => {
    const user = req.body

    // Hash the password to make it complex and unreadable
    const salt = bcrypt.genSaltSync(10)
    const hashed = bcrypt.hashSync(user.password, salt)

    // Generate a 64-character long random string
    const verId = crypto.randomBytes(32).toString('hex')

    try {
        // Add user to database
        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('INSERT INTO users (email, password, token) VALUES ($1, $2, $3) RETURNING id', [user.email, hashed, verId])
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
    } catch (err) {
        res.status(500).send('Failed to communicate with the database')
    }
})

router.put('/', access, async (req, res) => {
    const data = req.body
    const user = req.user

    try {
        // Save changes to database
        const client = await pool.connect(undefined) // Get a client from the pool
        await client.query('UPDATE users SET name = $1, phone = $2, address = $3, about = $4 WHERE id = $5', [data.name, data.phone, data.address, data.about, user.id])
        client.release() // Release the client back to the pool

        res.status(200)
    } catch (err) {
        res.status(500).send('Failed to communicate with the database')
    }
})

router.delete('/', access, async (req, res) => {
    const user = req.user

    try {
        // Remove user from database
        const client = await pool.connect(undefined) // Get a client from the pool
        await client.query('DELETE FROM users WHERE id = $1', [user.id])
        client.release() // Release the client back to the pool

        res.status(200)
    } catch (err) {
        res.status(500).send('Failed to communicate with the database')
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        // Get user from database
        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('SELECT name, phone, address, about FROM users WHERE id = $1', [id])
        client.release() // Release the client back to the pool

        res.send(result.rows[0])
    } catch (err) {
        res.status(500).send('Failed to communicate with the database')
    }
})

module.exports = router
