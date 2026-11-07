const { withAppBuildGradle } = require('expo/config-plugins');

// The Android SDK's bundled ninja (1.10.2) predates Windows long-path support
// (added in ninja 1.11), so its own mkdir() calls fail once CMake's generated
// object paths exceed 260 chars under a deep node_modules tree. Point CMake at
// a newer ninja binary instead.
const NINJA_PATH = 'H:/tools/ninja/ninja.exe';

function withNinjaOverride(config) {
  return withAppBuildGradle(config, (config) => {
    const marker = "buildConfigField \"String\", \"REACT_NATIVE_RELEASE_LEVEL\"";
    if (config.modResults.contents.includes('CMAKE_MAKE_PROGRAM')) {
      return config;
    }
    const insertion = `

        externalNativeBuild {
            cmake {
                arguments "-DCMAKE_MAKE_PROGRAM=${NINJA_PATH}"
            }
        }`;
    const idx = config.modResults.contents.indexOf(marker);
    if (idx === -1) {
      return config;
    }
    const lineEnd = config.modResults.contents.indexOf('\n', idx);
    config.modResults.contents =
      config.modResults.contents.slice(0, lineEnd) +
      insertion +
      config.modResults.contents.slice(lineEnd);
    return config;
  });
}

module.exports = withNinjaOverride;
