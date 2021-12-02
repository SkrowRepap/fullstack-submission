module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-trailing-spaces": [
            "error",
        ],
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "space-infix-ops": [
            "error"
        ],
        "semi": [
            "error",
            "never"
        ],
        "arrow-spacing": [
            "error",
            {"before": true, "after":true}
        ]

    }
}
