import { defineConfig } from '@prisma/config';
import 'dotenv/config'

console.log(process.env.DATABASE_URL || 'No DATABASE_URL found')

export default defineConfig({
    datasource: {
        url: process.env.DATABASE_URL as string,
    },
    migrations: {
        seed: "prisma/seed.ts"
    }
});
