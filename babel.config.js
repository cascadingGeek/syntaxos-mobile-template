/**
 * NativeWind compiles className props at build time, which needs both the
 * jsxImportSource swap and its own preset. Without these the app builds and
 * then renders completely unstyled — a failure that looks like a design bug
 * rather than a config one, so it is worth stating plainly here.
 */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    /**
     * Reanimated 4 moved its worklet transform into `react-native-worklets`,
     * and the plugin is REQUIRED — without it the app compiles, bundles and
     * installs perfectly, then dies the instant a worklet runs. Reanimated is
     * initialised by expo-router/react-navigation at startup, so in practice
     * that is the moment the icon is tapped: Android shows "Padi closed
     * because this app has a bug" and nothing reaches the JS logs.
     *
     * Measured on a real device: the first APK this pipeline ever shipped
     * crashed on launch with both `react-native-reanimated` and
     * `react-native-worklets` installed and neither one configured here.
     *
     * It MUST be last in the plugins list — the transform has to see the
     * output of every other plugin.
     */
    plugins: ["react-native-worklets/plugin"],
  };
};
