// const { i18n } = require("./next-i18next.config.js");
const { i18n } = require("./next-i18next.config");

const withPWA = require("next-pwa")({
  dest: "public", // service worker와 캐시 파일이 저장될 위치
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // 개발환경에서는 비활성화
});

module.exports = withPWA({
  reactStrictMode: false,
  i18n,
});
