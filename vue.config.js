module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/minesweeper_vue/'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static'
}
