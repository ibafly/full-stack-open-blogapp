/* eslint-env node */
module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2024": true,
        "es6": true,
        "jest/globals": true,
        "cypress/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        'plugin:react/jsx-runtime'
    ],
    // "parser": '@babel/eslint-parser', // 替换原babel-eslint
    "parserOptions": {
        // "requireConfigFile": false, // 若无Babel配置文件需添加此选项
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "overrides": [
        {
            "files": ["**.js", "**.jsx"],
            "parser": "@babel/eslint-parser"
        },
    ],
    "plugins": [
        "react",
        "jest",
        "cypress",
        "@babel"
    ],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "never"
        ],
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
        "no-console": 0,
        "react/prop-types": 0
    },
    "settings": {
        "react": {
            "version": "detect"
        }
    }
}
