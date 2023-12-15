module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        // "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jest/recommended",
        // "plugin:sonarjs/recommended",
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react", "eslint-plugin-jest", "sonarjs"],
    rules: {
        "react/prop-types": "off",
        "linebreak-style": ["error", "unix"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
    },
};
