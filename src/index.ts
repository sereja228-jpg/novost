import express from 'express';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(join(__dirname, '../public')));

const CATEGORIES = {
  business: 'Бизнес',
  economic: 'Экономика',
  finances: 'Финансы',
  politics: 'Политика'
};

app.get('/:count(\\d+)/news/for/:category/data', async (req, res) => {
  const { count, category } = req.params;
  const limit = parseInt(count, 10);

  if (!CATEGORIES[category]) {
    return res.json({ error: 'Неверная категория' });
  }
  if (limit <= 0 || limit > 50) {
    return res.json({ error: 'Число: 1–50' });
  }

  try {
    const rssUrl = `https://www.vedomosti.ru/rss/rubric/${category}`;
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();

    if (data.status !== 'ok' || !Array.isArray(data.items)) {
      return res.json({ error: 'Ошибка API' });
    }

    const items = data.items.slice(0, limit).map(item => ({
      title: (item.title || 'Без названия').toString(),
      description: ((item.description || '').toString().replace(/<[^>]*>/g, '')).substring(0, 300) + '...'
    }));

    res.json({ count: limit, categoryTitle: CATEGORIES[category], items });
  } catch (err) {
    res.json({ error: 'Ошибка сервера' });
  }
});

app.get(['/', '/:count(\\d+)/news/for/:category'], (req, res) => {
  res.sendFile(join(__dirname, '../public/html/index.html'));
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  console.log(`http://localhost:3000/5/news/for/business`);
});
