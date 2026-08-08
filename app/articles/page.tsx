import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/payload";
import { companyInfo } from "@/lib/services";

export const revalidate = 3600; // ISR: 每小时重新验证

export const metadata: Metadata = {
  title: "行业资讯 - 海天物资回收",
  description: `${companyInfo.name}行业资讯，废旧物资回收行业动态、回收价格行情、环保政策解读等。`,
  alternates: {
    canonical: `https://${companyInfo.domain}/articles`,
  },
};

export default async function ArticlesPage() {
  const { articles, total } = await getArticles(1, 20);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-700 to-brand-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            行业资讯
          </h1>
          <p className="text-xl text-white/90">
            废旧物资回收行业动态、价格行情、环保知识
          </p>
        </div>
      </section>

      {/* Article List */}
      <section className="py-16 bg-neutral-50 min-h-[400px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {article.coverImage && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs text-neutral-400 mb-2">
                        {new Date(article.publishedAt).toLocaleDateString(
                          "zh-CN"
                        )}
                      </p>
                      <h2 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-sm text-neutral-600 line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
              {total > 20 && (
                <div className="mt-8 text-center">
                  <p className="text-sm text-neutral-500">
                    共 {total} 篇文章，更多文章请持续关注
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-xl font-bold text-neutral-700 mb-2">
                文章即将上线
              </h2>
              <p className="text-neutral-500 mb-8">
                我们正在准备行业资讯内容，敬请期待
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition-colors"
              >
                返回首页
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
