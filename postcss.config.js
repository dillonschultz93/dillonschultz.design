module.exports = {
  plugins: [
    // require('postcss-cssnext')({}),
    require('lost')(),
    require('autoprefixer')({ /* ...options */ })
  ]
}