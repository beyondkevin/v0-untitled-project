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
}

module.exports = nextConfig
