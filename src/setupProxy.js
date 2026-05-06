const { createProxyMiddleware } = require("http-proxy-middleware");
require('dotenv').config();

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: process.env.REACT_APP_SERVICE_URL || "http://localhost:8180",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api",
      },
    }),
  );
};
