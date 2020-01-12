
function isWebTarget(caller) {
    return Boolean(caller && caller.target === 'web')
  }
  
  function isWebpack(caller) {
    return Boolean(caller && caller.name === 'babel-loader')
  }
  
  module.exports = api => {
    const web = api.caller(isWebTarget)
    // const webpack = api.caller(isWebpack)
  
    return {
      presets: [
        '@babel/preset-react',
        [
          '@babel/preset-env',
          {
            useBuiltIns: web ? 'entry' : undefined,
            corejs: web ? 'core-js@3' : false,
            targets: !web ? { node: 'current' } : "> 0.25%, not dead, ie >= 11",
            // modules: webpack ? false : 'commonjs',
          },
        ],
      ],
      plugins: [
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-object-rest-spread",
        [
          "@babel/plugin-transform-runtime",
          {
              "absoluteRuntime": false,
              "corejs": web ? '3' : false,
              "helpers": true,
              "regenerator": true,
              "useESModules": false,
              "version": "7.0.0-beta.0"
          }
      ],
        '@babel/plugin-syntax-dynamic-import',
        '@loadable/babel-plugin'
      ],
    }
  }