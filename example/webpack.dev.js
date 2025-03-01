const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const { library } = require("webpack");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "example.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./template.html"],
  },
});
