//Функцію для створення, рендеру або видалення розмітки

import { categories, products } from './refs';

export function createMarkupList(data) {
  const markupList = data
    .map(
      category =>
        `
    <li class="categories__item">
      <button class="categories__btn" type="button">${category}</button>
    </li>
    `
    )
    .join('');
  categories.insertAdjacentHTML('beforeend', markupList);
}

export function createMarkupProducts(data) {
  const markupProducts = data
    .map(
      (
        { id, thumbnail, title, brand, category, price } // деструктуруємо product
      ) =>
        `
    <li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: ${price} $</p>
 </li>

    `
    )
    .join('');
  products.insertAdjacentHTML('beforeend', markupProducts);
}
