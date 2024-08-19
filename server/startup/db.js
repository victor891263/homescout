const { Pool } = require("pg")

const pool = new Pool({
    connectionString: process.env.DB_URL,
    max: 10, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
})

module.exports = pool