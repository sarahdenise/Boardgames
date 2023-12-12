module.exports = {
    webpack: (config, options) => {
      config.module.rules.push({
         test: /\.xml$/i,
          use: 'raw-loader',
      })
   
      return config
    },
  }