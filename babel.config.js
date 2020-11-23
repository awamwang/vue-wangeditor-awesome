module.exports = {
  comments: false,
  presets: [
    [
      '@babel/preset-env',
      {
        'useBuiltIns': 'usage'
      }
    ]
  ],
  plugins: ['@babel/plugin-transform-runtime'],
  env: {
    test: {
      plugins: ['istanbul']
    }
  }
}
