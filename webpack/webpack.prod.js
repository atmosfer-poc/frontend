const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",
  output: {
    publicPath: "/",
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.name": JSON.stringify("prod-variable"),
      "process.env.apiUrl": JSON.stringify("http://185.126.217.205:8080/api"),
    }),
  ],
};
