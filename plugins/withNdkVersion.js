const { withProjectBuildGradle } = require('expo/config-plugins');

const NDK_VERSION = '28.2.13676358';

/**
 * Pins rootProject.ext.ndkVersion before expo-root-project's default-setting
 * plugin runs, so Gradle uses the NDK already installed locally instead of
 * triggering a new SDK download.
 */
function withNdkVersion(config) {
  return withProjectBuildGradle(config, (config) => {
    const marker = 'apply plugin: "expo-root-project"';
    const insertion = `ext.ndkVersion = '${NDK_VERSION}'\n\n${marker}`;
    if (config.modResults.contents.includes("ext.ndkVersion")) {
      return config;
    }
    config.modResults.contents = config.modResults.contents.replace(marker, insertion);
    return config;
  });
}

module.exports = withNdkVersion;
