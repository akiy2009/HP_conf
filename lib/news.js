import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const newsDirectory = path.join(process.cwd(), 'content/news');

export function getAllNews() {
  const fileNames = fs.readdirSync(newsDirectory);
  const allNews = fileNames.map(fileName => {
    const filePath = path.join(newsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(/\.md$/, ''),
      title: data.title || '',
      date: data.date ? new Date(data.date) : null,
      description: data.description || '',
      tags: data.tags || [],
      image: data.image || '/images/news1.jpg', // デフォルト画像
    };
  });

  // 日付降順でソート
  return allNews.sort((a, b) => (b.date - a.date));
}
