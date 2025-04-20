import { defineConfig } from "drizzle-kit";
import * as path from "path";

const dbPath = path.resolve(process.cwd(), "db/sqlite.db").replace(/\\/g, "/"); // 轉換 \ 為 /
const dbUrl = `file:///${dbPath}`; // 確保有 file:/// 前綴

export default defineConfig({
    schema: "./src/main/drizzle/schema.ts",
    out: "./src/main/drizzle/migrations",
    dialect: "sqlite",
    dbCredentials: {
        url: dbUrl,
    },
    verbose: true,
    strict: true,
    migrations: {},
});
