import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "~/schema";

const isDev = import.meta.env.DEV;

const db = drizzle<typeof schema>(
    async (sql, params, method) => {
        const result = await window.electron.drizzle.execute(sql, params, method);
        return { rows: result };
    },
    { schema: schema, logger: isDev }
);

export default db;
