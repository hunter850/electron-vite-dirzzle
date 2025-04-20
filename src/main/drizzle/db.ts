import { app } from "electron";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";
import path from "path";

const dbPath = app.isPackaged
    ? path.join(app.getPath("userData"), "sqlite.db")
    : path.resolve(process.cwd(), "db/sqlite.db");
const dbUrl = `file:///${dbPath}`; // 確保有 file:/// 前綴

export const client = createClient({ url: dbUrl });
export const db = drizzle({ client: client, schema, logger: true });
