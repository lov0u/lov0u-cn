import Link from "next/link";
import { companyInfo, services } from "@/lib/services";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-lg">
                海
              </div>
              <div className="text-lg font-bold text-white">
                海天物资回收
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              专业从事废旧物资回收，价格合理，诚信经营。长期高价回收废铜、废铝、废铁废钢、废不锈钢等各类废旧物资。
            </p>
          </div>

          {/* Services */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">主营业务</h3>
            <div className="grid grid-cols-1 gap-2">
              {services.slice(0, 4).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          {/* More Services */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">更多服务</h3>
            <div className="grid grid-cols-1 gap-2">
              {services.slice(4).map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
                >
                  {service.title}
                </Link>
              ))}
              <Link
                href="/articles"
                className="text-sm text-neutral-400 hover:text-brand-400 transition-colors"
              >
                行业资讯
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-1">
            <h3 className="text-white font-semibold mb-4">联系方式</h3>
            <div className="space-y-3">
              <a
                href={`tel:${companyInfo.phone}`}
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-brand-400 transition-colors"
              >
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {companyInfo.phone}
              </a>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {companyInfo.address}
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                全天候服务
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} {companyInfo.name}. 保留所有权利.
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <Link href="/" className="hover:text-brand-400 transition-colors">
                首页
              </Link>
              <span>|</span>
              <Link
                href="/about"
                className="hover:text-brand-400 transition-colors"
              >
                关于我们
              </Link>
              <span>|</span>
              <Link
                href="/contact"
                className="hover:text-brand-400 transition-colors"
              >
                联系我们
              </Link>
              <span>|</span>
              <Link
                href="/sitemap.xml"
                className="hover:text-brand-400 transition-colors"
              >
                网站地图
              </Link>
            </div>
          </div>
          <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-2 text-xs text-neutral-600">
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-400 transition-colors"
            >
              鲁ICP备2024080965号
            </a>
            <span className="hidden md:inline">|</span>
            <span>
              技术支持：{" "}
              <a
                href="https://ra0.cn/wangzhan"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-400 transition-colors"
              >
                青衣网络
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
