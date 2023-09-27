/** @typedef  {import('prettier').Config} PrettierConfig*/
/** @typedef  {import('prettier-plugin-tailwindcss').PluginOptions} TailwindConfig*/
/** @typedef  {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig*/

/** @type { PrettierConfig | TailwindConfig | SortImportsConfig} */
module.exports = {
  semi: false,
  singleQuote: true,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '^(next/(.*)$)|^(next$)',
    '^(react/(.*)$)|^(react$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[./]',
  ],
}
