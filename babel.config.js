module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@utils": "./src/utils",
            "@lib": "./src/lib",
            "@elements": "./src/elements",
            "@hooks": "./src/hooks",
            "@lang": "./src/lang",
            "@svg": "./src/svg",
            "@nav": "./src/nav",
            "@assets": "./src/assets",
            "@api": "./src/api",
            "@config": "./src/config",
            "@constant": "./src/constant",
            "@data": "./src/data",
            "@navigation": "./src/navigation",
            "@actions": "./src/store/actions",
            "@models": "./src/store/models",
            "@reducers": "./src/store/reducers",
            "@store": "./src/store",
            "@fonts": "./src/fonts",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
