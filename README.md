NOVOST

Учебный проект: сервер на Express + TypeScript и простой фронтенд, который показывает новости по маршруту вида:

text

/:count/news/for/:category

Например:

text

/5/news/for/business

где count — количество новостей, category — категория.

Возможности

Клиент:

Берёт части пути из window.location.pathname

Делает fetch запроса на /:count/news/for/:category/data

Отображает заголовки и описания новостей в виде <dl>

Показывает ошибки, если:

неверный URL

сервер вернул ошибку

не удалось загрузить данные

Стили:

Простое оформление списка новостей (style.css)

Подсветка заголовка и ошибок

Серверная логика реализуется в src/index.ts (Express + TypeScript).

Требования

Node.js  (рекомендуется версия 18+)

npm

Установка

git clone https://github.com/sereja228-jpg/novost.git

npm install

Запуск

npm start

После старта сервера открой в браузере:

text

http://localhost:3000/5/news/for/business

Значения 5 и business можно менять (в зависимости от того, какие категории поддерживает сервер).
