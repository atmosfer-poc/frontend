const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const srcPath = path.resolve(__dirname, "../src");
const resolveConfig = {
  "@common": path.resolve(srcPath, "common/"),
  "@redux": path.resolve(srcPath, "redux/"),
  "@components": path.resolve(srcPath, "components/"),
  "@api": path.resolve(srcPath, "api/"),
  "@pages": path.resolve(srcPath, "pages/"),
  "@routes": path.resolve(srcPath, "routes/"),
  "@assets": path.resolve(srcPath, "assets/"),
};

module.exports = {
  entry: path.resolve(srcPath, "./index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: resolveConfig,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "..", "./build"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./src/index.html"),
      favicon: "./favicon.ico",
    }),
  ],
  stats: "errors-only",
};
