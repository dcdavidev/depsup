const { defineConfig } = require('@cspell/cspell-types');

module.exports = defineConfig({
  version: '0.2',
  import: ['@spellbookx/cspell-config'],
  words: [],
  dictionaryDefinitions: [
    {
      name: 'custom-english',
      path: './.cspell/english.txt',
      addWords: true,
    },
    {
      name: 'custom-italian',
      path: './.cspell/italian.txt',
      addWords: true,
    },
    {
      name: 'custom-dev',
      path: './.cspell/dev.txt',
      addWords: true,
    },
    {
      name: 'custom-misc',
      path: './.cspell/misc.txt',
      addWords: true,
    },
  ],
  dictionaries: [
    'custom-english',
    'custom-italian',
    'custom-dev',
    'custom-misc',
  ],
});
