import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { companyInfo, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "关于我们 - 海天物资回收",
  description: `${companyInfo.name}是一家专业从事废旧物资回收的企业，拥有多年行业经验和专业团队。回收范围涵盖废铜、废铝、废铁废钢等八大类废旧物资。`,
  alternates: {
    canonical: `https://${companyInfo.domain}/about`,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-300 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-recycling-facility.jpg"
            alt="海天物资回收"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              关于海天物资回收
            </h1>
            <p className="text-xl text-white/90">
              专业废旧物资回收，诚信经营，价格公道
            </p>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-6">
                公司简介
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  海天物资回收是一家专业从事废旧物资回收的企业，总部位于烟台。多年来，我们始终秉承"诚信经营、价格公道、服务至上"的经营理念，为工厂、企业、个人提供高效、便捷、环保的废旧物资回收服务。
                </p>
                <p>
                  我们拥有专业的回收团队和完善的回收体系，配备多辆运输车辆和专业检测设备，能够满足不同规模的回收需求。从几公斤的废旧铜线到几十吨的工厂拆迁废铁，我们都认真对待，一视同仁。
                </p>
                <p>
                  海天物资回收持有再生资源回收经营许可证，所有回收的废旧物资均按照国家相关规定进行分类处理和再生利用，确保整个回收链条合法合规、环保安全。
                </p>
                <p>
                  我们的价格参考上海有色金属网、长江有色金属网等权威平台的实时行情，公开透明，绝不欺瞒客户。选择海天物资回收，就是选择了放心、省心、安心。
                </p>
              </div>
            </div>
            <div className="relative h-400 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/hero-recycling-facility.jpg"
                alt="海天物资回收"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              核心价值观
            </h2>
            <div className="mt-4 inline-block w-20 h-1 bg-brand-600 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤝",
                title: "诚信经营",
                desc: "价格公开透明，参考市场实时行情，绝不压价欺客。称重公开，结算及时，赢得客户信赖。",
              },
              {
                icon: "♻️",
                title: "环保理念",
                desc: "所有回收物资均按国家规定进行环保处理和再生利用，致力于推动循环经济发展。",
              },
              {
                icon: "⚡",
                title: "高效服务",
                desc: "快速响应，当天上门。专业团队，一站式服务。从评估到清运到结算，全程高效。",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              主营业务
            </h2>
            <p className="text-lg text-neutral-600">
              八大废旧物资回收品类，满足您的各种回收需求
            </p>
            <div className="mt-4 inline-block w-20 h-1 bg-brand-600 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group bg-neutral-50 rounded-xl p-6 hover:bg-brand-50 transition-colors"
              >
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-2">
                  {service.summary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-700 to-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            欢迎联系海天物资回收
          </h2>
          <p className="text-xl text-white/90 mb-8">
            专业回收，诚信经营，价格公道
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
