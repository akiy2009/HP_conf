import {getAllNews} from '@/lib/news';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const newsList = getAllNews();

  return (
    <main>
      {/* ヒーロー */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-32">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">技術とつながりを広げよう</h2>
          <p className="text-lg md:text-xl mb-8">無線通信をテーマにした、高専生によるオープンイベント</p>
          <a href="#entry" className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100">
            申し込みはこちら
          </a>
        </div>
      </section>

      {/* 概要 */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">イベント概要</h2>
          <p className="text-lg text-gray-700">
            高専カンファレンスは、全国の高専生・卒業生・技術愛好家が集まるコミュニティイベントです。今回は「無線通信」をテーマに、大阪で開催されます。
          </p>
        </div>
      </section>

      {/* スケジュール */}
      <section id="schedule" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">スケジュール</h2>
          <ul className="space-y-4 text-lg text-gray-700">
            <li><span className="font-semibold">10:00</span> 開場・受付</li>
            <li><span className="font-semibold">10:30</span> オープニング</li>
            <li><span className="font-semibold">11:00</span> 技術発表</li>
            <li><span className="font-semibold">13:00</span> 展示 & ワークショップ</li>
            <li><span className="font-semibold">16:00</span> クロージング</li>
          </ul>
          <p className="mt-4 text-sm text-gray-500">※2026年夏頃を予定。詳細は決まり次第お知らせします。</p>
        </div>
      </section>

      {/* 参加 */}
      <section id="entry" className="py-20 bg-gray-50 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">参加申し込み</h2>
          <p className="mb-6 text-gray-700">現在フォームを準備中です。</p>
          <a href="https://example.com/form" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700">
            申し込みフォームへ
          </a>
        </div>
      </section>

      {/* お知らせ */}
      <section id="news" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-gray-900">お知らせ</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {newsList.map(news => (
              <div key={news.slug} className="bg-white shadow p-4 rounded-lg">
                <img src={news.image} alt={news.title} className="w-full h-48 object-cover rounded-lg mb-4"/>
                <h3 className="text-lg font-bold text-indigo-600">{news.title}</h3>
                <p className="text-sm text-gray-500">{news.date?.toLocaleDateString()} - {news.description}</p>
                <div className="mt-2">
                  {news.tags.map(tag => (
                    <span key={tag} className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded mr-2">{tag}</span>
                  ))}
                </div>
                <Link href={`/news/${news.slug}`} className="text-indigo-600 hover:underline mt-2 inline-block">続きを読む →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section id="contact" className="py-20 bg-gray-50 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">お問い合わせ</h2>
          <p className="mb-6 text-gray-700">ご質問などは、下記のお問い合わせフォームへご連絡ください。</p>
          <a href="https://wirelessconf.com/script/mailform/mail" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700">
            お問い合わせフォーム
          </a>
        </div>
      </section>
    </main>
  );
}
