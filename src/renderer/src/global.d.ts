import { electronContext } from "../../preload";

declare global {
    interface Window {
        electron: typeof electronContext;
    }
}
