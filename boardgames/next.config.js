/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.xml$/i,
        use: 'raw-loader',
    })

    return config
  },
  output: 'export',
}

module.exports = nextConfig



// module.exports = {
//     webpack: (config, options) => {
//       config.module.rules.push({
//          test: /\.xml$/i,
//           use: 'raw-loader',
//       })
   
//       return config
//     },
//   }