async function seed() {
    const response = await connectionPool.query('SELECT 1')
    console.log(response)
}

seed()