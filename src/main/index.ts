import { app, BrowserWindow } from "electron";
import path from "path";
import windowSizeEvents from "#/mainEvents/windowSizeEvents";
import drizzleEvents from "#/mainEvents/drizzleEvents";
import { runMigrate } from "#/drizzle/migrate";

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "../preload/index.js"),
            sandbox: true,
        },
    });
    windowSizeEvents(win);
    drizzleEvents();
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, "../index.html"));
    } else {
        win.loadURL("http://localhost:3000");
    }
}

app.whenReady().then(async () => {
    await runMigrate();
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
