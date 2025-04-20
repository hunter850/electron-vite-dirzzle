// eslint-disable-next-line @typescript-eslint/no-require-imports
const builder = require("electron-builder");

const Platform = builder.Platform;

/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration
 */
const options = {
    // "store” | “normal” | "maximum". - For testing builds, use 'store' to reduce build time significantly.
    compression: "maximum",
    directories: {
        output: "build",
    },
    files: [
        "dist/**/*",
        "!build/**/*",
        "!public/**/*",
        {
            from: "dist/main/node_modules",
            to: "dist/main/node_modules",
        },
        {
            from: "dist/preload/node_modules",
            to: "dist/preload/node_modules",
        },
    ],
    win: {
        target: "nsis",
    },
    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        createDesktopShortcut: "always",
        createStartMenuShortcut: true,
    },
    extraMetadata: {
        main: "dist/main/index.js",
    },
};

builder
    .build({
        targets: Platform.WINDOWS.createTarget(),
        config: options,
    })
    .then((result) => {
        console.log(JSON.stringify(result));
    })
    .catch((error) => {
        console.error(error);
    });
