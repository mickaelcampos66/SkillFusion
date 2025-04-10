import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import stylistic from '@stylistic/eslint-plugin'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import reactHooks from 'eslint-plugin-react-hooks'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import reactPlugin from 'eslint-plugin-react'
import jestPlugin from 'eslint-plugin-jest'
import testingLibrary from 'eslint-plugin-testing-library'
import jestDomPlugin from 'eslint-plugin-jest-dom'

export default tseslint.config(
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      jsxA11y.flatConfigs.recommended,
      reactPlugin.configs.flat.recommended,
      reactPlugin.configs.flat['jsx-runtime'],
    ],
    settings: { react: { version: 'detect' } },
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      '@next/next': nextPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactHooks.configs.recommended.rules,
    },
  },
  // Style/Formatting
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      ...stylistic.configs.recommended.rules,
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'non-jsx' }],
    },
  },
  // Testing
  {
    files: ['**/*.test.{ts,tsx}'],
    ...jestPlugin.configs['flat/recommended'],
    ...testingLibrary.configs['flat/react'],
    ...jestDomPlugin.configs['flat/recommended'],
    languageOptions: {
      globals: { ...globals.jest, ...globals.node },
    },
    plugins: {
      'jest': jestPlugin,
      'jest-dom': jestDomPlugin,
      'testing-library': testingLibrary,
    },
    rules: {
      ...jestPlugin.configs['flat/recommended'].rules,
      ...testingLibrary.configs['flat/react'].rules,
      ...jestDomPlugin.configs['flat/recommended'].rules,
    },
  },
  { ignores: ['.next', 'public'] },
)
