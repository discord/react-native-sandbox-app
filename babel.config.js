module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          'react-native': './node_modules/react-native/packages/react-native',
        },
      },
    ],
  ],
};
