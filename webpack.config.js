module.exports = {
  mode: "development",
  entry: ["./src/index.js"],
  output: {
    path: __dirname + "/dist",
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },

  //JUKE CONFIG
  // module: {
  //   rules: [
  //     {
  //       test: /jsx?$/,
  //       exclude: /node_modules/,
  //       loader: "babel-loader",
  //       options: {
  //         presets: ["@babel/preset-react"],
  //       },
  //     },
  //   ],
  // },
};
