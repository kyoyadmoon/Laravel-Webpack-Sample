var path = require('path');
var webpack = require('webpack');

var config = {
  devServer: {
    contentBase: "http://localhost:8000/",
    noInfo: true,
    hot: true,
    inline: true
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8080', //這個entry是自動更新用的
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'public/js/main.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'public/build'), //webpack 建置專案的路徑
    publicPath: "http://localhost:8080/public/build/", //webpack 使用 require() 時參考的路徑  (bundle.js 位址)
    filename: 'bundle.js'
  },
  module: {
    loaders: [

      // JSX
      {
        test: [/\.(js|jsx)$/],
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'public/js/') //include jsx src path for react-hot-loader
      },

      // CSS   這邊因為我下面使用了SASS，所以這邊CSS就不需要了，使用方法相同
      // {
      //   test: /\.css$/, // Only .css files
      //   loader: 'style!css', // Run both loaders
      //   include: path.join(__dirname, 'app/css/')
      // },

      // SASS
      {
        test: /\.scss$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'public/sass/')
      }
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),  //不使用 webpack-dev-server 的 inline-mode 時才需要加入
    new webpack.NoErrorsPlugin() //if any error exists ,the demo will not autorefresh
  ]
};

module.exports = config;
