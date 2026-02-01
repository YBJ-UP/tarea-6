const { Pool } = require('pg');
require('dotenv').config()

const connectionPool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    port: 5432,
})

export const query = (text:string, params?: any[]) => connectionPool.query(text, params)