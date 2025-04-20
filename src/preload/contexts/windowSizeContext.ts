import { ipcRenderer } from "electron";
import type { IpcRendererEvent } from "electron";

const windowSizeContext = {
    listenWindowSizeStatus: (cb: (message: string) => void) => {
        function triggerHandler(_event: IpcRendererEvent, message: string) {
            cb(message);
        }
        ipcRenderer.on("window-size-status", triggerHandler);
        return () => {
            ipcRenderer.removeListener("window-size-status", triggerHandler);
        };
    },
    minimizeWindow: () => {
        ipcRenderer.invoke("minimize-window");
    },
    maximizeWindow: () => {
        ipcRenderer.invoke("maximize-window");
    },
    unmaximizeWindow: () => {
        ipcRenderer.invoke("unmaximize-window");
    },
};

export default windowSizeContext;
