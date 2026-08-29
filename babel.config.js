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
  };
};
