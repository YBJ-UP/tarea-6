import { loadEnvConfig } from '@next/env'

const dir = process.cwd()
loadEnvConfig(dir)

const config = {
    POSTGRES_URL: process.env.POSTGRES_URL
}

export default config