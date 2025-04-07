# VSCode Configuration for ESLint

1. Install the ESLint extension for VSCode from the [Marketplace](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

2. To configure VSCode to use ESLint as the formatter and to enable automatic fixes, add the following settings to your `.vscode/settings.json` file:

```json
{
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

With this configuration, ESLint will be used to format your code and apply automatic fixes when saving files.
