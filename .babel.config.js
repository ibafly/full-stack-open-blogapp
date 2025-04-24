module.exports = (api) => {
  api.cache(false)

  const presets = [
    ["@babel/preset-env", {
      modules: false,
      "useBuiltIns": "usage",
      "corejs": "3.0.0"
    }],
    "@babel/preset-react",
  ]

  return {
    presets,
  }
}
