const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const pool = require('../startup/db')

router.get('/:id', async (req, res) => {
    const verId = req.params.id
    const token = req.headers.authorization // get jwt sent by client

    // If no jwt is found, don't proceed
    if (!token) return res.status(400).send('No user credentials (token) seems to be found')

    const user = jwt.verify(token, process.env.JWT_SECRET) // extract user info

    // Remove the verification id
    const client = await pool.connect(undefined) // Get a client from the pool
    const result = await client.query('UPDATE users SET token = NULL WHERE id = $1 AND token = $2 RETURNING id', [user.id, verId])
    client.release() // Release the client back to the pool

    // If no user with the given verification id is found, return an error to the client
    if (result.rows.length > 0) {
        // Create the json web token
        const newToken = jwt.sign({
            id: user.id,
            verified: true
        }, process.env.JWT_SECRET)

        res.send(newToken)
    } else res.status(400).send('The verification link appears to be invalid')
})

module.exports = router