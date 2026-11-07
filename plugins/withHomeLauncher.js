const { withAndroidManifest } = require('expo/config-plugins');

const ACTION_MAIN = 'android.intent.action.MAIN';
const CATEGORY_HOME = 'android.intent.category.HOME';
const CATEGORY_DEFAULT = 'android.intent.category.DEFAULT';

/**
 * Registers the app's launcher activity as a HOME app candidate by adding
 * the HOME and DEFAULT categories to its existing MAIN intent-filter.
 */
function withHomeLauncher(config) {
  return withAndroidManifest(config, (config) => {
    const application = config.modResults.manifest.application?.[0];
    const activities = application?.activity ?? [];

    const mainActivity = activities.find((activity) =>
      (activity['intent-filter'] ?? []).some((filter) =>
        (filter.action ?? []).some((a) => a.$['android:name'] === ACTION_MAIN)
      )
    );

    if (!mainActivity) {
      throw new Error('withHomeLauncher: could not find an activity with a MAIN intent-filter');
    }

    const launcherFilter = (mainActivity['intent-filter'] ?? []).find((filter) =>
      (filter.action ?? []).some((a) => a.$['android:name'] === ACTION_MAIN)
    );

    launcherFilter.category = launcherFilter.category ?? [];

    const hasCategory = (name) =>
      launcherFilter.category.some((c) => c.$['android:name'] === name);

    if (!hasCategory(CATEGORY_HOME)) {
      launcherFilter.category.push({ $: { 'android:name': CATEGORY_HOME } });
    }
    if (!hasCategory(CATEGORY_DEFAULT)) {
      launcherFilter.category.push({ $: { 'android:name': CATEGORY_DEFAULT } });
    }

    return config;
  });
}

module.exports = withHomeLauncher;
