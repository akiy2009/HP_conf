export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className="font-sans text-gray-900 bg-white">
        {/* ヘッダー */}
        <header className="bg-white shadow">
          <div className="container mx-auto flex items-center justify-between p-4">
            <h1 className="text-xl font-bold text-indigo-600">
              高専カンファレンス無線通信 <span className="text-gray-800">IN 大阪</span>
            </h1>
            <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
              <a href="/" className="hover:text-indigo-600">ホーム</a>
              <a href="#about" className="hover:text-indigo-600">概要</a>
              <a href="#schedule" className="hover:text-indigo-600">スケジュール</a>
              <a href="#entry" className="hover:text-indigo-600">参加</a>
              <a href="#news" className="hover:text-indigo-600">お知らせ</a>
              <a href="#contact" className="hover:text-indigo-600">連絡</a>
            </nav>
          </div>
        </header>

        {children}

        {/* フッター */}
        <footer className="bg-gray-800 text-gray-300 py-6">
          <div className="container mx-auto text-center">
            <p>&copy; 2025 高専カンファレンス無線通信 IN 大阪 実行委員会</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
