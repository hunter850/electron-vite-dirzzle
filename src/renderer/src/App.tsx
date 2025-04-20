import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
const { getSqlitePath } = window.electron.drizzle;
import db from "@/drizzle/db";
import { UserTable, UserSettingTable } from "~/schema";
import buildConflictUpdateColumns from "@/drizzle/buildConflictUpdateColumns";

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
                                set: buildConflictUpdateColumns(UserTable, ["name"]),
                            });
                        console.log("insertedUsers: ", insertedUsers);
                    }}
                >
                    set users
                </button>
                <button
                    onClick={async () => {
                        const users = await db.query.UserTable.findMany({
                            with: {
                                posts: { with: { postCategories: { with: { category: true } } } },
                                preferences: true,
                                setting: { columns: { setting: true } },
                            },
                        });
                        const output = users.map((user) => {
                            return { ...user, setting: user.setting?.setting ?? null };
                        });
                        console.log("output: ", output);
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
                        await db.insert(UserSettingTable).values({ userId });
                        console.log("initSettingData: ");
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
