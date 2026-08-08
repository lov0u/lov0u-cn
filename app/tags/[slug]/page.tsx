import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getArticlesByTag, getAllTagSlugs } from "@/lib/payload";
import { companyInfo } from "@/lib/services";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllTagSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { tag } = await getArticlesByTag(slug);

  if (!tag) {
    return {
      title: "标签未找到",
    };
  }

  return {
    title: `标签: ${tag.name}`,
    description: `浏览${companyInfo.name}「${tag.name}」标签下的所有文章`,
    alternates: {
      canonical: `https://${companyInfo.domain}/tags/${tag.slug}/`,
    },
  };
}

export default async function TagArticlesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { articles, total, tag } = await getArticlesByTag(slug);

  if (!tag) {
    notFound();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-r from-brand-700 to-brand-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {tag.name}
          </h1>
          <p className="text-xl text-white/90">
            共 {total} 篇相关文章
          </p>
        </div>
      </section>

      {/* Article List */}
      <section className="py-16 bg-neutral-50 min-h-[400px]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-8">
            <Link href="/" className="hover:text-brand-600">
              首页
            </Link>
            <span>/</span>
            <Link href="/articles" className="hover:text-brand-600">
              行业资讯
            </Link>
            <span>/</span>
            <Link href="/tags" className="hover:text-brand-600">
              标签
            </Link>
            <span>/</span>
            <span className="text-neutral-900">{tag.name}</span>
          </nav>

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
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📄</div>
              <h2 className="text-xl font-bold text-neutral-700 mb-2">
                暂无文章
              </h2>
              <p className="text-neutral-500 mb-8">
                该标签下暂无文章内容
              </p>
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 transition-colors"
              >
                浏览全部文章
              </Link>
            </div>
          )}

          {/* Back to tags */}
          <div className="mt-8 text-center">
            <Link
              href="/tags"
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
              查看全部标签
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
