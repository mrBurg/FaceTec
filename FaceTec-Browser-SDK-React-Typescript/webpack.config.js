module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: "./src/BasicComponent.tsx",
  output: {
    libraryTarget: "this",
    filename: "./bundle.js",
    path: __dirname + "/build"
  },
  devServer: {
    writeToDisk: true
  },
  module: {
    rules: [
    // all files with a ".ts" or ".tsx" extension will be handled by "ts-loader"
    { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js", ".tsx"]
  }
};
