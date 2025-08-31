import { getAllNewsSlugs, readNewsBySlug, getPrevNext } from '@/lib/news';

// 事前ビルドするパス
export async function generateStaticParams() {
  return getAllNewsSlugs().map(slug => ({ slug }));
}

// OGP/メタデータ（記事ごと）
export async function generateMetadata({ params }) {
  const { meta } = readNewsBySlug(params.slug);
  const url = `https://your-domain.example/news/${meta.slug}`;
  return {
    title: `${meta.title} | 高専カンファレンス無線通信 IN 大阪`,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: [meta.image || '/images/news1.jpg'],
      type: 'article',
      url
    },
    twitter: {
      card: 'summary_large_image'
    },
    alternates: { canonical: url }
  };
}

export default function NewsArticlePage({ params }) {
  const { meta, html } = readNewsBySlug(params.slug);
  const { prev, next } = getPrevNext(params.slug);

  return (
    <main className="bg-gray-100">
      <div className="container mx-auto px-6 py-10">
        <a href="/#news" className="inline-flex items-center text-indigo-600 hover:underline mb-6">
          ← 一覧に戻る
        </a>

        {/* ヘッダーカード */}
        <header className="bg-white shadow rounded-lg overflow-hidden mb-10">
          <img
            src={meta.image || '/images/news1.jpg'}
            alt={meta.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{meta.title}</h1>
            <p className="text-sm text-gray-500 mb-4">
              {new Date(meta.date).toLocaleDateString()}
            </p>
            {meta.tags?.length > 0 && (
              <div className="flex justify-center flex-wrap gap-2">
                {meta.tags.map((t) => (
                  <span key={t} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* 本文 */}
        <article
          className="prose max-w-none bg-white shadow rounded-lg p-6 mb-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* 前後記事 */}
        <nav className="flex justify-between text-indigo-600 font-semibold mb-20">
          <div>
            {prev ? (
              <a href={`/news/${prev.slug}`} className="hover:underline">&larr; 前の記事</a>
            ) : <span />}
          </div>
          <div>
            {next ? (
              <a href={`/news/${next.slug}`} className="hover:underline">次の記事 &rarr;</a>
            ) : <span />}
          </div>
        </nav>
      </div>
    </main>
  );
}
