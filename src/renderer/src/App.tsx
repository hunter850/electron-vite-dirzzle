import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
const { setUsers, getUsers, getSqlitePath, initSetting } = window.electron.drizzle;

function App() {
    const [count, setCount] = useState(0);
    const [userId, setUserId] = useState<string>("");
    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
                <button
                    onClick={async () => {
                        await setUsers();
                        console.log("users seted");
                    }}
                >
                    set users
                </button>
                <button
                    onClick={async () => {
                        const users = await getUsers();
                        console.log("users: ", users);
                    }}
                >
                    get users
                </button>
                <button
                    onClick={async () => {
                        const sqlitePath = await getSqlitePath();
                        console.log("sqlitePath: ", sqlitePath);
                    }}
                >
                    get sqlite path
                </button>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
                <button
                    onClick={async () => {
                        const initSettingData = await initSetting(userId);
                        console.log("initSettingData: ", initSettingData);
                    }}
                >
                    init setting
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default App;
