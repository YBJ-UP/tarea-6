const { Pool } = require('pg');
require('dotenv').config()

const connectionPool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

export const query = (text:string, params?: any[]) => connectionPool.query(text, params)