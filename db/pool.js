const { Pool } = require("pg");

module.exports = new Pool({
    connectionString:process.env.DB_URL,
    ssl: { rejectUnauthorized: false },
    idleTimeoutMillis: 30000, 
    connectionTimeoutMillis: 5000,
})