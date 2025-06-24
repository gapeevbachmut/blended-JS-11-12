//Функцію для створення, рендеру або видалення розмітки

import { categories, products, modalProduct } from './refs';
//  Створюю кнопку для кожної категорії
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

//            MODAL   WINDOW

export function renderModalProduct(product) {
  const {
    title,
    description,
    price,
    images,
    tags = ['eco', 'new'], // fallback для тесту
    shipping = 'Free shipping available',
    returnPolicy = '30-day return',
  } = product;

  const markup = `
    <img class="modal-product__img" src="${images?.[0] || ''}" alt="${title}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${title}</p>
      <ul class="modal-product__tags">
        ${tags.map(tag => `<li>${tag}</li>`).join('')}
      </ul>
      <p class="modal-product__description">${description}</p>
      <p class="modal-product__shipping-information">Shipping: ${shipping}</p>
      <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
      <p class="modal-product__price">Price: $${price}</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>
  `;

  modalProduct.innerHTML = markup;
}
