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
  "parserOptions": {
      "ecmaFeatures": {
          "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "overrides": [
    {
      "files": ["**.js", "**.jsx"],
      "parser": "babel-eslint"
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
