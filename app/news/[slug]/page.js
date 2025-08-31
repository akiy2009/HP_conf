iimport Image from 'next/image';
import Link from 'next/link';
import { readNewsBySlug, getAllNewsSlugs, getPrevNext } from '@/lib/news';
import { remark } from 'remark';
import html from 'remark-html';

export async function generateStaticParams() {
  const slugs = getAllNewsSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function NewsPage({ params }) {
  const { slug } = params;
  const news = readNewsBySlug(slug);

  const contentHtml = await remark().use(html).process(news.content);
  const htmlString = contentHtml.toString();

  const { prev, next } = getPrevNext(slug);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <p className="text-gray-500 mb-4">{news.date}</p>
      <Image
        src={news.image || '/images/news1.jpg'}
        alt={news.title}
        width={800}
        height={400}
        className="rounded mb-6"
      />
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlString }} />
      <div className="flex justify-between mt-8">
        {prev ? <Link href={`/news/${prev.slug}`} className="hover:underline">← {prev.title}</Link> : <div />}
        {next ? <Link href={`/news/${next.slug}`} className="hover:underline">{next.title} →</Link> : <div />}
      </div>
      <Link href="/" className="block mt-6 text-blue-500 hover:underline">トップページへ戻る</Link>
    </div>
  );
}
