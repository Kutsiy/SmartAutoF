// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  root: true,
  env: {
    browser: true,
    node: true,
    es2023: true,
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
  },
  ignorePatterns: ['.nuxt', 'node_modules'],
)
