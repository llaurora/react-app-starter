module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "alloy",
        "alloy/react",
        "alloy/typescript",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
    ],
    plugins: ["@typescript-eslint", "unicorn"],
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    globals: {
        document: true,
        navigator: true,
        window: true,
        node: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
        sourceType: "module",
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            node: {
                extensions: [".tsx", ".ts", ".js", ".json"],
            },
        },
    },
    overrides: [
        {
            files: ["**/*.d.ts"],
            rules: {
                "import/no-duplicates": 0,
            },
        },
    ],
    rules: {
        // 'off'或者0表示关闭规则，'warn'或者1将规则打开为警告（不影响退出代码),'error'或者2- 将规则打开为错误（触发时退出代码为1）
        "prettier/prettier": 2,
        "@typescript-eslint/explicit-member-accessibility": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/no-unused-vars": 2,
        "react-hooks/rules-of-hooks": 2,
        "react-hooks/exhaustive-deps": 1,
        "unicorn/filename-case": [
            2,
            {
                cases: {
                    kebabCase: false,
                    camelCase: true,
                    snakeCase: false,
                    pascalCase: true,
                },
            },
        ],
    },
};
