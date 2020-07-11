module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "All in NeeBoo | NeeBoo Box Corporation"
    }
  },
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      // mutate config for production...
      console.log("config webpack", config.devtool);

      config.devtool = false;
    } else {
      // mutate for development...
    }
  }
};
