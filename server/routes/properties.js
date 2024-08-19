const express = require('express')
const router = express.Router()
const pool = require('../startup/db')

router.get('/', async (req, res) => {
    try {
        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('SELECT NOW()')
        res.send(result.rows[0])
        client.release() // Release the client back to the pool
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router