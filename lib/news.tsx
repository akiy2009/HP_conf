import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const newsDirectory = path.join(process.cwd(), 'content/news');

export function getAllNews() {
  const files = fs.readdirSync(newsDirectory);
  const news = files.map((file) => {
    const slug = file.replace('.md', '');
    const fullPath = path.join(newsDirectory, file);
    const content = fs.readFileSync(fullPath, 'utf-8');
    const { data } = matter(content);
    return { slug, ...data };
  });
  return news.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getAllNewsSlugs() {
  const files = fs.readdirSync(newsDirectory);
  return files.map((file) => file.replace('.md', ''));
}

export function readNewsBySlug(slug) {
  const fullPath = path.join(newsDirectory, `${slug}.md`);
  const content = fs.readFileSync(fullPath, 'utf-8');
  const { data, content: markdown } = matter(content);
  return { slug, ...data, content: markdown };
}

export function getPrevNext(slug) {
  const allNews = getAllNews();
  const index = allNews.findIndex((n) => n.slug === slug);
  const prev = allNews[index - 1] || null;
  const next = allNews[index + 1] || null;
  return { prev, next };
}
