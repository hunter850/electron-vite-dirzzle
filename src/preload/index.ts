// import { contextBridge, ipcRenderer } from "electron";
// import type { IpcRendererEvent } from "electron";
import { contextBridge } from "electron";
import windowSizeContext from "./contexts/windowSizeContext";
import drizzleContext from "./contexts/drizzleContext";

// export const electronContext = {
//     windowSize: {
//         listenWindowSizeStatus: (cb: (message: string) => void) => {
//             function triggerHandler(_event: IpcRendererEvent, message: string) {
//                 cb(message);
//             }
//             ipcRenderer.on("window-size-status", triggerHandler);
//             return () => {
//                 ipcRenderer.removeListener("window-size-status", triggerHandler);
//             };
//         },
//         minimizeWindow: () => {
//             ipcRenderer.invoke("minimize-window");
//         },
//         maximizeWindow: () => {
//             ipcRenderer.invoke("maximize-window");
//         },
//         unmaximizeWindow: () => {
//             ipcRenderer.invoke("unmaximize-window");
//         },
//     },
// };
export const electronContext = {
    windowSize: windowSizeContext,
    drizzle: drizzleContext,
};

contextBridge.exposeInMainWorld("electron", electronContext);
