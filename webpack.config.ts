import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';

const config: Configuration = {
  devtool: false,
  module: {
    rules: [
      {
        test: /.*\.js/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new InjectManifest({ swSrc: './src/sw.js' }),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};

export default config;
