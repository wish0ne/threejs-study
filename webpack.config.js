const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

//node.js 환경변수
//NODE_ENV는 script에 따라 반영됨
//웹팩 mode : production(default) / development / none
const webpackMode = process.env.NODE_ENV || "development";

module.exports = {
  mode: webpackMode,
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].min.js",
  },
  devServer: {
    liveReload: true, //default가 true이므로 설정안해줘도됨
  },
  optimization: {
    minimizer:
      webpackMode === "production"
        ? [
            new TerserPlugin({
              extractComments: false, //주석을 별도의 파일로 분리할지 여부
            }),
          ]
        : [],
  },
  module: {
    rules: [
      {
        test: /\.js$/, //.js인 파일에만 적용
        loader: "babel-loader",
        exclude: /node_modules/, //node_modules안의 파일들은 제외
        //options 옵션을 적지 않으면 babel 설정 파일 읽어서 적용함.
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      //index.html 템플릿 기반으로 빌드 결과물 추가해줌
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
    // CopyWebpackPlugin: 그대로 복사할 파일들을 설정하는 플러그인
    // 아래 patterns에 설정한 파일/폴더는 빌드 시 dist 폴더에 자동으로 생성됨
    // patterns에 설정한 경로에 해당 파일이 없으면 에러가 발생
    // 그대로 사용할 파일들이 없다면 CopyWebpackPlugin을 통째로 주석 처리 해주세요.
    new CopyWebpackPlugin({
      patterns: [
        { from: "./src/main.css", to: "./main.css" },
        { from: "./src/textures", to: "./textures" },
      ],
    }),
  ],
};
