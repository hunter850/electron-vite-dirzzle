import { app } from "electron";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import path from "path";

const dbPath = app.isPackaged
    ? path.join(app.getPath("userData"), "sqlite.db")
    : path.resolve(process.cwd(), "db/sqlite.db");

export const client = new Database(dbPath);
export const db = drizzle({ client: client, schema, logger: app.isPackaged === false });
