import { contextBridge } from "electron";
import windowSizeContext from "./contexts/windowSizeContext";
import drizzleContext from "./contexts/drizzleContext";

export const electronContext = {
    windowSize: windowSizeContext,
    drizzle: drizzleContext,
};

contextBridge.exposeInMainWorld("electron", electronContext);
