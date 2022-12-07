const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
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
  ],
};
