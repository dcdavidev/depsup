import spellbookxConfig from '@spellbookx/prettier-config';

/**
 * @type {import("prettier").Config}
 */
const config = {
  ...spellbookxConfig,
  overrides: [
    {
      files: ['.czrc'],
      options: {
        parser: 'json',
      },
    },
  ],
};

export default config;
