/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: "./",
  chainWebpack: (config) => {
    config.module.rules.delete("svg"); // 重点:删除默认配置中处理svg,
    config.module
      .rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include.add(resolve("src/assets/svg")) // 处理svg目录
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end()
      .use("svgo-loader")
      .loader("svgo-loader")
      .tap((options) => ({
        ...options,
        plugins: [
          {
            name: "removeAttrs",
            params: {
              attrs: "(fill|stroke)",
            },
          },
        ],
      }))
      .end();
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.join(__dirname, "./src/styles/variables.less")],
    },
  },
};
