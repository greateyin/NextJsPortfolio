/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      serverComponentsExternalPackages: [
        '@react-email/render',
      ]
    },
    // 如果需要配置 API 路由，可以使用以下配置
    // 但在最新版本中，这通常是不必要的
    // api: {
    //   bodyParser: {
    //     sizeLimit: '1mb',
    //   },
    // },
  }
  
  module.exports = nextConfig