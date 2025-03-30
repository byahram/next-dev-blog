import prettierPluginTailwindcss from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
const config = {
  plugins: [prettierPluginTailwindcss],
  tailwindConfig: "./tailwind.config.ts",
  semi: false,
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  trailingComma: "es5",
};

export default config;
