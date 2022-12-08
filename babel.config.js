module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage", //usage : 필요한 폴리필을 바벨에서 자동으로 주입
        corejs: 3, //사용할 core-js 패키지 버전 지정
      },
    ],
  ],
};
