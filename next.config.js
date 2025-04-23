/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 生成静态HTML文件
  distDir: "out", // 指定输出目录为 'out'
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // 静态导出时需要禁用图片优化
  },
  trailingSlash: true, // 为每个页面添加尾部斜杠，提高兼容性
  // 确保客户端路由正常工作
  basePath: "",
  // 禁用严格模式以避免开发/生产环境差异
  reactStrictMode: false,
}

module.exports = nextConfig
