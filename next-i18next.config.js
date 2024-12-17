// next-i18next.config.js
const path = require("path");

module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ko"], // 지원할 언어 목록
  },
  localePath: path.resolve("./public/locales"), // 번역 파일의 경로
};
