module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    parser: "@typescript-eslint/parser",
    ecmaFeatures : {
      jsx : false
    }
  },
  globals: {
    //与上方的rules是同级的
    __WebpackModuleApi: true,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-var-requires": 'off',
    "no-self-assign": 'off',
    "@typescript-eslint/explicit-module-boundary-types":'off',
    "no-unused-vars": 'off',
    "@typescript-eslint/no-unused-vars":"off",
    "@typescript-eslint/no-explicit-any": ["off"]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
