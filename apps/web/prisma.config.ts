import { defineConfig } from '@prisma/config';
import 'dotenv-flow/config'

export default defineConfig({
    datasource: {
        url: process.env.DATABASE_URL as string,
    },
    migrations: {
        seed: "prisma/seed.ts"
    }
});
