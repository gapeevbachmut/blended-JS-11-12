//Функцію для створення, рендеру або видалення розмітки

import { categories, products } from './refs';

export function markupList(data) {
  const allList = data
    .map(
      category =>
        `
    <li class="categories__item">
      <button class="categories__btn" type="button">${category}</button>
    </li>
    `
    )
    .join('');
  categories.insertAdjacentHTML('beforeend', allList);
}
