module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base", // Adicionaas regras do Airbnb Style Guide
    "plugin:@typescript-eslint/recommended", // Adiciona as recomendações padrões @typescript-eslint/eslint-plugin
    "prettier/@typescript-eslint", // Adiciona as configurações do prettier para evitar conflitos de regras @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Adiciona o plugin do prettier
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "no-shadow": "off", // replaced by ts-eslint rule below
    "@typescript-eslint/no-shadow": "error",
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
