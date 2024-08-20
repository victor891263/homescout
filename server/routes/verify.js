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

    try {
        // Remove the verification id
        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('UPDATE users SET ver_id = NULL WHERE id = $1 AND ver_id = $2 RETURNING id', [user.id, verId])
        client.release() // Release the client back to the pool

        // If no user with the given verification id is found, return an error to the client
        if (result.rows.length === 0) return res.status(400).send('The verification link appears to be invalid')

        // Create the json web token
        const newToken = jwt.sign({
            id: user.id,
            verified: true
        }, process.env.JWT_SECRET)

        res.send(newToken)
    } catch (err) {
        res.status(500).send('Failed to communicate with the database')
    }
})

module.exports = router