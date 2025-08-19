import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginJest from 'eslint-plugin-jest';

export default tseslint.config(
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'warn'
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname
      }
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      eslintPluginJest.configs['flat/recommended']
    ],
    settings: {
      react: {
        version: 'detect'
      }
    },
    ignores: ['dist', 'build', 'node_modules', 'apps/*/dist', 'apps/*/build']
  },
  {
    files: ['apps/**/*.tsx'],
    extends: [
      eslintPluginReact.configs.flat.recommended,
      eslintPluginJsxA11y.flatConfigs.recommended,
      eslintPluginReactHooks.configs['recommended-latest'],
      eslintPluginReactRefresh.configs.vite
    ]
  },
  {
    files: ['**/*'],
    extends: [eslintConfigPrettierFlat]
  }
);
