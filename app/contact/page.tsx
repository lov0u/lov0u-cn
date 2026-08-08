import type { Metadata } from "next";
import { companyInfo, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "联系我们 - 海天物资回收",
  description: `联系${companyInfo.name}，电话：${companyInfo.phone}。专业回收废铜、废铝、废铁废钢等各类废旧物资，烟台及周边地区免费上门看货。`,
  alternates: {
    canonical: `https://${companyInfo.domain}/contact`,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-700 to-brand-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            联系我们
          </h1>
          <p className="text-xl text-white/90">
            专业废旧物资回收，免费上门看货，价格公道
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">
                联系方式
              </h2>
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-brand-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      回收热线
                    </h3>
                    <a
                      href={`tel:${companyInfo.phone}`}
                      className="text-2xl font-bold text-brand-600 hover:text-brand-700"
                    >
                      {companyInfo.phone}
                    </a>
                    <p className="text-sm text-neutral-500 mt-1">
                      全天候接听，欢迎来电咨询
                    </p>
                  </div>
                </div>

                {/* Service Area */}
                <div className="flex items-start gap-4 p-6 bg-neutral-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      服务区域
                    </h3>
                    <p className="text-neutral-600">{companyInfo.address}及周边地区</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      免费上门看货，量大优先
                    </p>
                  </div>
                </div>

                {/* Service Time */}
                <div className="flex items-start gap-4 p-6 bg-neutral-50 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-accent-600 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-white"
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
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-1">
                      服务时间
                    </h3>
                    <p className="text-neutral-600">全天候服务</p>
                    <p className="text-sm text-neutral-500 mt-1">
                      随时来电，快速响应
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Services */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  快速联系
                </h3>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 bg-brand-600 text-white rounded-lg font-bold text-lg hover:bg-brand-700 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
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
                  立即拨打 {companyInfo.phone}
                </a>
              </div>
            </div>

            {/* Service List */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">
                回收项目
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((service) => (
                  <a
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-3 p-4 bg-neutral-50 rounded-xl hover:bg-brand-50 transition-colors group"
                  >
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h3 className="font-bold text-neutral-900 group-hover:text-brand-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        {service.priceRange}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Process */}
              <div className="mt-8 p-6 bg-brand-50 rounded-xl">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  回收流程
                </h3>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <span className="text-sm text-neutral-700">
                      电话联系，说明废旧物资种类和数量
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <span className="text-sm text-neutral-700">
                      专业人员上门看货，现场评估分类
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <span className="text-sm text-neutral-700">
                      参考市场行情，给出合理回收价格
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center">
                      4
                    </span>
                    <span className="text-sm text-neutral-700">
                      装车清运，现场称重，即时结算
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
