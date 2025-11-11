import { defineConfig } from 'eslint/config';
import spellbookx from '@spellbookx/eslint-plugin';

export default defineConfig([
  ...spellbookx.configs['recommended-astro'],
  {
    files: ['packages/depsup/src/cli.ts'],
    rules: {
      'unicorn/no-process-exit': 'off',
    },
  },
]);
