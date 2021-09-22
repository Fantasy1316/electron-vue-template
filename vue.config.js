module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/styles/mixins.scss";`
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
}
