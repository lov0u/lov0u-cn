import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { services, companyInfo, type Service } from "@/lib/services";

// 静态生成所有服务页面
export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// 为每个服务页面生成 SEO 元数据
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = services.find((s) => s.slug === slug);
    if (!service) return {};

    return {
      title: `${service.title} - 价格合理上门回收`,
      description: service.summary,
      keywords: [
        service.title,
        `${service.shortTitle}回收`,
        `${service.shortTitle}回收价格`,
        `${service.shortTitle}回收电话`,
        `${service.shortTitle}上门回收`,
        `烟台${service.shortTitle}回收`,
        companyInfo.name,
      ],
      alternates: {
        canonical: `https://${companyInfo.domain}/services/${service.slug}`,
      },
      openGraph: {
        title: `${service.title} - ${companyInfo.name}`,
        description: service.summary,
        images: [
          {
            url: service.image,
            width: 1200,
            height: 630,
            alt: service.title,
          },
        ],
      },
    };
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  // JSON-LD 结构化数据
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "LocalBusiness",
      name: companyInfo.name,
      telephone: companyInfo.phone,
    },
    areaServed: "烟台及周边地区",
    serviceType: service.title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-3 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-brand-600">
              首页
            </Link>
            <span>/</span>
            <span className="text-neutral-900">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-400 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.image}
            alt={service.title}
            loading="eager"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {service.title}
            </h1>
            <p className="text-xl text-white/90 mb-6">{service.summary}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${companyInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition-colors"
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
                电话咨询
              </a>
              <span className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg">
                参考价格：{service.priceRange}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose-content">
                <h2>{service.title}简介</h2>
                <p>{service.content.intro}</p>

                {service.content.sections.map((section, idx) => (
                  <div key={idx}>
                    <h2>{section.heading}</h2>
                    {section.body.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}
                  </div>
                ))}

                {/* Materials */}
                <h2>回收范围</h2>
                <ul>
                  {service.materials.map((material, idx) => (
                    <li key={idx}>{material}</li>
                  ))}
                </ul>

                {/* Advantages */}
                <h2>我们的优势</h2>
                {service.advantages.map((adv, idx) => (
                  <div key={idx} className="mb-4">
                    <strong>{adv.title}：</strong>
                    {adv.description}
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Contact Card */}
              <div className="bg-brand-50 rounded-xl p-6 mb-6 sticky top-20">
                <h3 className="text-xl font-bold text-neutral-900 mb-4">
                  需要回收{service.shortTitle}？
                </h3>
                <p className="text-sm text-neutral-600 mb-6">
                  立即联系我们，免费上门看货评估，价格公道合理
                </p>
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-brand-600 text-white rounded-lg font-bold text-lg hover:bg-brand-700 transition-colors mb-4"
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
                  {companyInfo.phone}
                </a>
                <div className="text-center text-sm text-neutral-500">
                  全天候服务 · 免费上门
                </div>
              </div>

              {/* Features */}
              <div className="bg-neutral-50 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">
                  服务特色
                </h3>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <svg
                        className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="bg-accent-50 rounded-xl p-6">
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  参考价格
                </h3>
                <p className="text-2xl font-bold text-accent-600">
                  {service.priceRange}
                </p>
                <p className="text-xs text-neutral-500 mt-2">
                  * 实际价格以看货后为准，具体请电话咨询
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              {service.title}流程
            </h2>
            <div className="mt-4 inline-block w-20 h-1 bg-brand-600 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {service.process.map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-white rounded-xl p-6 shadow-sm text-center h-full">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-brand-700">
                      {String(step.step).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-neutral-600">{step.description}</p>
                </div>
                {idx < service.process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-brand-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              常见问题
            </h2>
            <div className="mt-4 inline-block w-20 h-1 bg-brand-600 rounded-full" />
          </div>
          <div className="space-y-6">
            {service.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-neutral-50 rounded-xl p-6 hover:bg-brand-50 transition-colors"
              >
                <h3 className="text-lg font-bold text-neutral-900 mb-3 flex items-start gap-2">
                  <span className="text-brand-600 flex-shrink-0">Q:</span>
                  {faq.q}
                </h3>
                <p className="text-neutral-600 leading-relaxed flex items-start gap-2">
                  <span className="text-brand-600 flex-shrink-0 font-bold">
                    A:
                  </span>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              其他回收项目
            </h2>
            <div className="mt-4 inline-block w-20 h-1 bg-brand-600 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={rel.image}
                    alt={rel.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-3 left-4 text-lg font-bold text-white">
                    {rel.title}
                  </h3>
                </div>
                <div className="p-4">
                  <p className="text-sm text-neutral-600 line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-700 to-brand-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            需要{service.title}服务？
          </h2>
          <p className="text-xl text-white/90 mb-8">
            立即拨打热线电话，免费上门看货评估
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
