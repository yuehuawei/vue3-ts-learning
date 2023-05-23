const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/api": {
        target: "http://123.207.32.32:5000",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
});
