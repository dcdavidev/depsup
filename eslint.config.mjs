import { defineConfig } from 'eslint/config';
import spellbookx from '@spellbookx/eslint-plugin';

export default defineConfig([...spellbookx.configs['recommended-astro']]);
