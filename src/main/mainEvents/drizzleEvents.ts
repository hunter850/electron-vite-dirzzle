import { ipcMain, app } from "electron";
import { db, client } from "../drizzle/db";
import { sql, getTableColumns, asc, desc, eq, count, gt } from "drizzle-orm";
import type { PgTable } from "drizzle-orm/pg-core";
import type { SQLiteTable } from "drizzle-orm/sqlite-core";
import type { SQL } from "drizzle-orm";
import {
    UserTable,
    UserPreferencesTable,
    PostTable,
    CategoryTable,
    PostCategoryTable,
    UserSettingTable,
} from "../drizzle/schema";
import path from "path";
import { runMigrate } from "../drizzle/migrate";
// types
import type { BrowserWindow, IpcMainInvokeEvent } from "electron";

const buildConflictUpdateColumns = <T extends PgTable | SQLiteTable, Q extends keyof T["_"]["columns"]>(
    table: T,
    columns: Q[]
) => {
    const cls = getTableColumns(table);
    return columns.reduce(
        (acc, column) => {
            const colName = cls[column].name;
            acc[column] = sql.raw(`excluded.${colName}`);
            return acc;
        },
        {} as Record<Q, SQL>
    );
};

export default function drizzleEvents() {
    ipcMain.handle("set-user", async () => {
        const insertedUsers = await db
            .insert(UserTable)
            .values([
                {
                    name: "Kevin Luo",
                    age: 28,
                    email: "test@test.com",
                },
                {
                    name: "Gary Lin",
                    age: 25,
                    email: "test2@test.com",
                },
            ])
            .returning()
            .onConflictDoUpdate({
                target: UserTable.email,
                // set: { name: "Updated Name" },
                set: buildConflictUpdateColumns(UserTable, ["name"]),
            });
        return insertedUsers;
    });
    ipcMain.handle("get-user", async () => {
        const users = await db.query.UserTable.findMany({
            // columns: { email: true, name: true },
            with: {
                posts: { with: { postCategories: { with: { category: true } } } },
                preferences: true,
                setting: { columns: { setting: true } },
            },
        });
        // const output = users.map((user) => {
        //     return {
        //         ...user,
        //         posts: user.posts.map(({ postCategories, ...rest }) => {
        //             return { ...rest, categories: postCategories.map((postCategory) => postCategory.category.name) };
        //         }),
        //     };
        // });
        return users;
    });
    ipcMain.handle("migrate-db", async () => {
        await runMigrate();
    });
    ipcMain.handle("get-sqlite-dir", async () => {
        const dbPath = app.isPackaged
            ? path.join(app.getPath("userData"), "sqlite.db")
            : path.resolve(process.cwd(), "db/sqlite.db");
        return dbPath;
    });
    ipcMain.handle("init-setting", async (_event: IpcMainInvokeEvent, userId: string) => {
        const initSettingData = await db
            .insert(UserSettingTable)
            .values({
                userId: userId,
            })
            .returning();
        return initSettingData;
    });
    ipcMain.handle(
        "db:execute",
        async (_event: IpcMainInvokeEvent, sql: string, params: any[], method: "run" | "all" | "get") => {
            const stmt = client.prepare(sql);
            const result = stmt[method](...params) as Record<string, any>[] | Record<string, any>;
            if (Array.isArray(result)) {
                return result.map(Object.values);
            } else {
                return Object.values(result);
            }
        }
    );
}
