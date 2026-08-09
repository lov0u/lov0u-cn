import Link from "next/link";
import { services, companyInfo } from "@/lib/services";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-recycling-facility.jpg"
            alt="海天物资回收 - 专业废旧物资回收服务"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-slide-up">
              海天物资回收
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-4 animate-slide-up">
              专业废旧物资回收 · 高价上门 · 即时结算
            </p>
            <p className="text-lg text-white/80 mb-8 max-w-xl animate-slide-up">
              长期高价回收废铜、废铝、废铁废钢、废不锈钢、废塑料、废旧电子、废旧电缆电线、废旧设备等各类废旧物资。价格公道，诚信经营。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <a
                href={`tel:${companyInfo.phone}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 text-white rounded-lg font-semibold text-lg hover:bg-brand-700 transition-colors shadow-lg"
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
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-brand-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">10+</div>
              <div className="text-sm text-white/80">年行业经验</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">8大</div>
              <div className="text-sm text-white/80">回收品类</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">1000+</div>
              <div className="text-sm text-white/80">服务客户</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-1">24h</div>
              <div className="text-sm text-white/80">全天候响应</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              主营回收项目
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              专业回收各类废旧物资，价格合理，上门服务，诚信经营
            </p>
            <div className="mt-4 inline-block w-20 h-1 bg-brand-600 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-xl font-bold text-white">
                    {service.title}
                  </h3>
                </div>
                <div className="p-5">
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                    {service.summary}
                  </p>
                  <div className="flex items-center text-brand-600 text-sm font-medium">
                    了解详情
                    <svg
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              为什么选择我们
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              海天物资回收，您值得信赖的废旧物资回收合作伙伴
            </p>
            <div className="mt-4 inline-block w-20 h-1 bg-brand-600 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💰",
                title: "价格透明",
                desc: "参考上海有色金属网实时行情，公开透明，绝不压价",
              },
              {
                icon: "🚗",
                title: "上门服务",
                desc: "烟台及周边地区免费上门看货，省时省力",
              },
              {
                icon: "⚡",
                title: "即时结算",
                desc: "交易完成后立即付款，现金转账均可，绝不拖欠",
              },
              {
                icon: "🛡️",
                title: "资质齐全",
                desc: "持有再生资源回收经营许可证，合法合规经营",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-xl bg-neutral-50 hover:bg-brand-50 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              回收流程
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              简单四步，轻松完成废旧物资回收
            </p>
            <div className="mt-4 inline-block w-20 h-1 bg-brand-600 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "电话预约",
                desc: "拨打18354479555，说明废旧物资种类和数量",
              },
              {
                step: "02",
                title: "上门看货",
                desc: "专业人员上门查看，现场评估分类",
              },
              {
                step: "03",
                title: "合理定价",
                desc: "参考市场行情，给出公平合理价格",
              },
              {
                step: "04",
                title: "清运结算",
                desc: "装车清运，现场称重，即时结算",
              },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-700">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{item.desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-brand-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                关于海天物资回收
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  海天物资回收是一家专业从事废旧物资回收的企业，拥有多年行业经验和专业的回收团队。我们致力于为工厂、企业、个人提供高效、便捷、环保的废旧物资回收服务。
                </p>
                <p>
                  我们回收范围涵盖废铜、废铝、废铁废钢、废不锈钢、废塑料、废旧电子、废旧电缆电线、废旧设备等八大类废旧物资。价格参考市场实时行情，公开透明，诚信经营。
                </p>
                <p>
                  海天物资回收拥有完善的回收体系和专业的运输团队，服务范围覆盖烟台及周边地区。我们承诺：上门看货免费，价格公道合理，交易即时结算，欢迎来电咨询。
                </p>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/about" className="btn-primary">
                  了解更多
                </Link>
                <a href={`tel:${companyInfo.phone}`} className="btn-outline">
                  联系我们
                </a>
              </div>
            </div>
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/hero-recycling-facility.jpg"
                alt="海天物资回收工厂"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-brand-700 to-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            有废旧物资需要处理？
          </h2>
          <p className="text-xl text-white/90 mb-8">
            立即拨打我们的热线电话，免费上门看货评估
          </p>
          <a
            href={`tel:${companyInfo.phone}`}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-brand-700 rounded-xl font-bold text-2xl hover:bg-brand-50 transition-colors shadow-2xl"
          >
            <svg
              className="w-8 h-8"
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
        </div>
      </section>
    </>
  );
}
