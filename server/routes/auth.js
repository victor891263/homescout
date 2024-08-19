const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../startup/db')

router.post('/', async (req, res) => {
    const user = req.body // The email and password that the guest gave

    try {
        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('SELECT password, token FROM users WHERE email = $1', [user.email])
        client.release() // Release the client back to the pool

        // Check if user with the given email exists in the database. If it doesn't, don't proceed
        if (result.rows.length === 0) return res.status(400).send('Invalid email')

        // Check if the given password matches with the one in the database. If it doesn't, don't proceed
        const valid = await bcrypt.compare(user.password, result.rows[0].password)
        if (!valid) return res.status(400).send('Invalid password')

        // Create the json web token
        const token = jwt.sign({
            id: user.id,
            verified: !result.rows[0].token // If verification id still exists, that means the user is unverified
        }, process.env.JWT_SECRET)

        // Send the json web token to the client
        res.send(token)
    } catch (err) {
        res.status(500).send('Failed to communicate with the database')
    }
})

module.exports = router