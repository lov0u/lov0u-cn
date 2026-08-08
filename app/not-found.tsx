import Link from "next/link";
import { companyInfo } from "@/lib/services";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-brand-200 mb-4">404</div>
        <h1 className="text-2xl font-bold text-neutral-900 mb-4">
          页面未找到
        </h1>
        <p className="text-neutral-600 mb-8">
          您访问的页面可能已被移除或暂时不可用。如需回收废旧物资，请直接联系我们。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition-colors"
          >
            返回首页
          </Link>
          <a
            href={`tel:${companyInfo.phone}`}
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-600 text-brand-600 rounded-lg font-semibold hover:bg-brand-50 transition-colors"
          >
            电话咨询：{companyInfo.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
