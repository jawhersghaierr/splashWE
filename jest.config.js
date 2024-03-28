module.exports = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/components/**/*.{js,jsx,mjs}", "src/leftMenu/**/*.{js,jsx,mjs}", "src/utils/**/*.{js,jsx,mjs}"],
    coveragePathIgnorePatterns: ["/node_modules/", "<rootDir>/src/components/mainDashboard/Home.js"],
    moduleDirectories: ["jest", "node_modules"],
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov"],
    moduleFileExtensions: ["js", "json", "jsx"],
    setupFiles: ["@testing-library/react/dont-cleanup-after-each"],
    testEnvironment: "jsdom",
    testEnvironmentOptions: { url: "http://localhost/" },
    snapshotResolver: "<rootDir>/jest/snapshotResolver.js",
    testMatch: ["**/?(*.)+(spec|test).js?(x)"],
    testPathIgnorePatterns: ["\\\\node_modules\\\\"],
    transformIgnorePatterns: ["<rootDir>/node_modules/"],
    verbose: false,
    setupFilesAfterEnv: ["<rootDir>/jest/jest.setup.js"],
    moduleNameMapper: {
        "^.+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$": "jest-transform-stub",
    },
    transform: {
        "^.+\\.jsx?$": "babel-jest",
        "^.+\\.js?$": "babel-jest",
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest/fileTransformer.js",
    },
};
