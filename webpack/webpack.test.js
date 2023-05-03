const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  output: {
    publicPath: "/",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("test-variable"),
      "process.env.apiUrl": JSON.stringify("https://test.istesuit.com/api"),
    }),
  ],
};
