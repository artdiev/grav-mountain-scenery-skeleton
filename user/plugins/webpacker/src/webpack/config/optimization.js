const deepmerge = require('deepmerge')

/* global GravConfig */

// Plugins libraries
const TerserPlugin = require('terser-webpack-plugin');

// OPTIMIZATION CONFIG
// ––––––––––––––––––––––

module.exports = () => {
  let optimization = {
    // To keep filename consistent between different modes
    occurrenceOrder: true
  }

  // Code splitting webpack runtime code
  const runtimeChunk = {
    runtimeChunk: {
      name: 'manifest'
    }
  }

  // Code splitting node_modules vendors
  const vendorsChunk = {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 1
        }
      }
    }
  }

  // Code splitting entries common code
  const commonsChunk = {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2,
          priority: 0,
          reuseExistingChunk: true
        }
      }
    }
  }

  // Minify JS options
  const UglifyJsMinimizer = {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true
          },
          output: {
            beautify: false,
            comments: false
          }
        }
      })
    ]
  }

  if (GravConfig.manifest) optimization = { ...optimization, ...runtimeChunk }
  if (GravConfig.vendors) optimization = deepmerge(optimization, vendorsChunk)
  if (GravConfig.commons) optimization = deepmerge(optimization, commonsChunk)
  if (GravConfig.prod) optimization = { ...optimization, ...UglifyJsMinimizer }

  return optimization
}
