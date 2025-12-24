document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.slice(1).split('/');
  const count = path[0];
  const category = path[2];

  if (!count || !category) {
    showError('Неверный /5/news/for/business');
    return;
  }

  fetch(`/${count}/news/for/${category}/data`)
    .then(res => res.json())
    .then(data => {
      if (data.error) return showError(data.error);

      let html = `<h3>${data.count} новостей: ${data.categoryTitle}</h3><dl>`;
      data.items.forEach((item, i) => {
        html += `<dt>${i + 1}. ${item.title}</dt>`;
        html += `<dd>${item.description}</dd>`;
      });
      html += `</dl>`;
      document.getElementById('content').innerHTML = html;
    })
    .catch(() => showError('Ошибка загрузки'));
});

function showError(msg) {
  document.getElementById('content').innerHTML = `<h3 class="error">${msg}</h3>`;
}
