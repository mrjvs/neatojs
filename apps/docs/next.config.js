const { guider } = require('@neato/guider');

const withGuider = guider({
  themeConfig: './theme.config.ts',
});

module.exports = withGuider();
