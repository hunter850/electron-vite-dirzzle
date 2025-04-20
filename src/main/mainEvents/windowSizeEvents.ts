import { ipcMain } from "electron";
// types
import type { BrowserWindow } from "electron";

export default function windowSizeEvents(win: BrowserWindow) {
    win.on("maximize", () => {
        win.webContents.send("window-size-status", "maximize");
    });

    win.on("unmaximize", () => {
        win.webContents.send("window-size-status", "unmaximize");
    });

    ipcMain.handle("minimize-window", () => {
        win.minimize();
    });

    ipcMain.handle("maximize-window", () => {
        win.maximize();
    });

    ipcMain.handle("unmaximize-window", () => {
        win.unmaximize();
    });
}
