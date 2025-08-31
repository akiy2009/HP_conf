import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const NEWS_DIR = path.join(process.cwd(), 'content', 'news');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

export function getAllNewsSlugs() {
  if (!fs.existsSync(NEWS_DIR)) return [];
  return fs.readdirSync(NEWS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''));
}

export function readNewsBySlug(slug) {
  const filePath = path.join(NEWS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  const meta = {
    title: data.title || '無題',
    date: data.date || new Date().toISOString(),
    description: data.description || '',
    image: normalizeImagePath(data.image), // 例: images/foo.jpg
    tags: normalizeTags(data.tags),        // ['tag1','tag2']
    slug
  };

  const html = marked.parse(content);
  return { meta, html };
}

/** 画像パスを / から始まる公開URLに正規化。存在しなければデフォ画像にフォールバック */
function normalizeImagePath(image) {
  const FALLBACK = '/images/news1.jpg';
  if (!image || typeof image !== 'string') return FALLBACK;

  const rel = image.startsWith('/') ? image.slice(1) : image; // 先頭/を除去して確認
  const diskPath = path.join(PUBLIC_DIR, rel);
  if (fs.existsSync(diskPath)) {
    return '/' + rel;
  }
  return FALLBACK;
}

/** 'tag1, tag2' や ['tag1','tag2'] を配列に正規化 */
function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.map(t => String(t).trim()).filter(Boolean);
  return String(tags).split(',').map(t => t.trim()).filter(Boolean);
}

/** 一覧用：すべての記事メタを返す（新しい日付順） */
export function getAllNewsMetaSorted() {
  const slugs = getAllNewsSlugs();
  const list = slugs.map(slug => {
    const { meta } = readNewsBySlug(slug);
    return meta;
  });
  return list.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** 前後の記事を計算 */
export function getPrevNext(slug) {
  const list = getAllNewsMetaSorted();
  const index = list.findIndex(m => m.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : null,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : null
  };
}
