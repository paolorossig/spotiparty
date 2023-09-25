/** @typedef  {import("prettier").Config} PrettierConfig*/
/** @typedef  {{ tailwindConfig: string }} TailwindConfig*/

/** @type { PrettierConfig | TailwindConfig } */
module.exports = {
  semi: false,
  singleQuote: true,
  plugins: [
    'prettier-plugin-tailwindcss',
  ],
}
