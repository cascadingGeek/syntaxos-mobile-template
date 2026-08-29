/**
 * Metro must run the CSS through NativeWind, otherwise `global.css` is just an
 * unresolved import and every Tailwind class is a no-op.
 */
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./src/global.css" });
