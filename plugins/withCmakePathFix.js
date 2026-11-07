const { withGradleProperties } = require('expo/config-plugins');

/**
 * Keeps CMake-generated object paths short enough to stay under Windows'
 * legacy 260-char path limit, which ninja.exe hits regardless of the OS
 * long-paths policy when building native modules from a deeply nested
 * node_modules tree.
 */
function withCmakePathFix(config) {
  return withGradleProperties(config, (config) => {
    config.modResults = config.modResults.filter(
      (item) => !(item.type === 'property' && item.key === 'expo.android.cmakeObjectPathMax')
    );
    config.modResults.push({
      type: 'property',
      key: 'expo.android.cmakeObjectPathMax',
      value: '200',
    });
    return config;
  });
}

module.exports = withCmakePathFix;
