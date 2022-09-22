/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin");
 
function resolve(dir) {
  return path.join(__dirname, dir); // path.join(__dirname)设置绝对路径
}

module.exports = {
  publicPath: "./",
  productionSourceMap: process.env.NODE_ENV !== 'production',
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
  configureWebpack: () => {
    const plugins = [];
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/, // 匹配文件
          threshold: 10240, // 超过10k的数据压缩
          deleteOriginalAssets: false, // 是否删除源文件
          filename: '[path][base].gz',
        }),
      );
    }
    return plugins
  }
};
