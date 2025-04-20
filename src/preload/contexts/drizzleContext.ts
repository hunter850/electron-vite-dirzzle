import { ipcRenderer } from "electron";
import { UserSettingTable } from "~/schema";

const drizzleContext = {
    setUsers: async () => {
        const insertedUsers = (await ipcRenderer.invoke("set-user")) as Record<string, any>[];
        return insertedUsers;
    },
    getUsers: async () => {
        const users = (await ipcRenderer.invoke("get-user")) as Record<string, any>[];
        return users;
    },
    migrateDb: async () => {
        await ipcRenderer.invoke("migrate-db");
    },
    getSqlitePath: async () => {
        const sqlitePath = (await ipcRenderer.invoke("get-sqlite-dir")) as string;
        return sqlitePath;
    },
    initSetting: async (userId: string) => {
        const initSettingData = (await ipcRenderer.invoke(
            "init-setting",
            userId
        )) as typeof UserSettingTable.$inferInsert;
        return initSettingData;
    },
};

export default drizzleContext;
