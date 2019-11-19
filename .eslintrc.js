// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    jquery: false,
  },
  extends: [
    // 'prettier',
    // 'airbnb',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],

  rules: {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-tabs": "off",
    "indent": ["warn", 2],
    "arrow-parens": ["error", "as-needed"],
    "no-trailing-spaces": ["warn", { "skipBlankLines": false }],
    "padded-blocks": ["warn", "never"],
    "max-len": ["warn", 120,
      {
        "ignoreComments": true,
        "ignoreStrings": true
      }
    ],
    "no-unused-vars": [ "warn", { "argsIgnorePattern": "body|res|err" }],
    "no-plusplus": "off",
    "no-extra-boolean-cast": "warn",
    "no-use-before-define": ["error", { "functions": false }],
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "quotes": ["warn", "single", { "allowTemplateLiterals": true }],
    "camelcase": ["warn", { "properties": "never" }],
    "semi": "off",
    "prefer-const": 2,
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    "no-underscore-dangle": [ "error", { "allow": [ "_rgb", "_hsl"] }],
    "object-curly-newline": ["warn", {
      "ObjectExpression": {
        "multiline": true,
        "minProperties": 2
      },
      "ObjectPattern": "never"
    }],
    "space-before-function-paren": ["warn", {
      "anonymous": "always",
      "named": "always",
      "asyncArrow": "ignore"
    }]
  },
  settings: {

  }
}



