import Link from "next/link"

export default function MainNavigation() {
  return (
    <nav className="flex items-center space-x-6">
      <Link href="/projects" className="text-gray-700 hover:text-purple-600 transition-colors">
        项目
      </Link>
      <Link href="/pricing" className="text-gray-700 hover:text-purple-600 transition-colors">
        价格
      </Link>
      <Link href="/privacy" className="text-gray-700 hover:text-purple-600 transition-colors">
        隐私
      </Link>
      <Link href="/support" className="text-gray-700 hover:text-purple-600 transition-colors">
        支持
      </Link>
    </nav>
  )
}
