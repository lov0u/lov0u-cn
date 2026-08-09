import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticle, getAllArticleSlugs, getArticles } from "@/lib/payload";
import { companyInfo } from "@/lib/services";
import ArticleCharts from "@/app/ArticleCharts";

export const revalidate = 60; // ISR: 每分钟重新验证

// 构建时预生成所有文章页
export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

// 动态生成 SEO 元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    keywords: article.metaKeywords?.split(",") || [],
    alternates: {
      canonical: `https://${companyInfo.domain}/articles/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // 获取所有文章用于相关文章和上下篇导航
  const { articles } = await getArticles(1, 100);

  // 相关文章（排除当前文章，最多3篇）
  const relatedArticles = articles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  // 上一篇/下一篇导航
  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  // Article Schema JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: companyInfo.name,
    },
    publisher: {
      "@type": "Organization",
      name: companyInfo.name,
    },
  };

  // Breadcrumb Schema JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "首页",
        item: `https://${companyInfo.domain}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "行业资讯",
        item: `https://${companyInfo.domain}/articles/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://${companyInfo.domain}/articles/${article.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-3 border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/" className="hover:text-brand-600">
              首页
            </Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-brand-600">
              行业资讯
            </Link>
            <span>/</span>
            <span className="text-neutral-900 line-clamp-1">
              {article.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-8">
            <span>
              {new Date(article.publishedAt).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span>|</span>
            <span>{companyInfo.name}</span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <ArticleCharts />

          {/* CTA */}
          <div className="mt-12 p-8 bg-brand-50 rounded-xl text-center">
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              需要废旧物资回收服务？
            </h3>
            <p className="text-neutral-600 mb-4">
              立即拨打热线电话，免费上门看货评估
            </p>
            <a
              href={`tel:${companyInfo.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 text-white rounded-lg font-bold text-lg hover:bg-brand-700 transition-colors"
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
          </div>

          {/* Prev / Next Navigation */}
          {(prevArticle || nextArticle) && (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link
                  href={`/articles/${prevArticle.slug}`}
                  className="group flex items-center gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-brand-300 transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-neutral-400 group-hover:text-brand-600 transition-colors flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-400">上一篇</p>
                    <p className="text-sm font-medium text-neutral-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                      {prevArticle.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {nextArticle ? (
                <Link
                  href={`/articles/${nextArticle.slug}`}
                  className="group flex items-center gap-3 p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:border-brand-300 transition-colors text-right md:flex-row-reverse"
                >
                  <svg
                    className="w-5 h-5 text-neutral-400 group-hover:text-brand-600 transition-colors flex-shrink-0"
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
                  <div className="min-w-0">
                    <p className="text-xs text-neutral-400">下一篇</p>
                    <p className="text-sm font-medium text-neutral-900 group-hover:text-brand-600 transition-colors line-clamp-1">
                      {nextArticle.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                相关文章
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((relArticle) => (
                  <Link
                    key={relArticle.id}
                    href={`/articles/${relArticle.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-neutral-200"
                  >
                    {relArticle.coverImage && (
                      <div className="relative aspect-[21/9] overflow-hidden bg-neutral-100">
                        <img
                          src={relArticle.coverImage}
                          alt={relArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-xs text-neutral-400 mb-2">
                        {new Date(relArticle.publishedAt).toLocaleDateString(
                          "zh-CN"
                        )}
                      </p>
                      <h3 className="text-base font-bold text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {relArticle.title}
                      </h3>
                      <p className="text-sm text-neutral-600 line-clamp-2">
                        {relArticle.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Back to list */}
          <div className="mt-8 text-center">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              返回文章列表
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
