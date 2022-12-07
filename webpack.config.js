const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
  },
  devServer: {
    liveReload: true, //default가 true이므로 설정안해줘도됨
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false, //주석을 별도의 파일로 분리할지 여부
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //index.html 템플릿 기반으로 빌드 결과물 추가해줌
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};