module.exports = {
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  rules: {
    "vue/multi-word-component-names": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
