const express = require('express')
const router = express.Router()
const pool = require('../startup/db')
const access = require('../middleware/access')

router.get('/', async (req, res) => {
    try {
        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('SELECT * FROM properties')
        client.release() // Release the client back to the pool

        res.send(result.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id

        const client = await pool.connect(undefined) // Get a client from the pool
        const result = await client.query('SELECT * FROM properties WHERE id = $1', [id])
        client.release() // Release the client back to the pool

        res.send(result.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.post('/', access, async (req, res) => {
    try {
        const data = req.body
        const user = req.user

        const client = await pool.connect(undefined) // Get a client from the pool
        await client.query('INSERT INTO properties (marketer, date_posted, price, address, bathrooms, bedrooms, floors, type, tenure, description, size) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)', [user.id, ...Object.values(data)])
        client.release() // Release the client back to the pool

        res.status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.put('/:id', access, async (req, res) => {
    try {
        const data = req.body
        const user = req.user
        const id = req.params.id

        const client = await pool.connect(undefined) // Get a client from the pool
        await client.query('UPDATE properties SET price = $1, tenure = $2, description = $3 WHERE id = $4 AND marketer = $5', [...Object.values(data), id, user.id])
        client.release() // Release the client back to the pool

        res.status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

router.delete('/:id', access, async (req, res) => {
    try {
        const user = req.user
        const id = req.params.id

        const client = await pool.connect(undefined) // Get a client from the pool
        await client.query('DELETE FROM properties WHERE id = $1 AND marketer = $2', [id, user.id])
        client.release() // Release the client back to the pool

        res.status(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

module.exports = router