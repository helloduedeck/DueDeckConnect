module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          '@api': './app/api',
          '@assets': './app/assets',
          '@components': './app/components',
          '@context': './app/context',
          '@hooks': './app/hooks',
          '@models': './app/models',
          '@store': './app/store',
          '@slice': './app/store/slice',
          '@routes': './app/routes',
          '@screens': './app/screens',
          '@theme': './app/theme',
          '@types': './app/types',
          '@utils': './app/utils',
        },
      },
    ],
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
