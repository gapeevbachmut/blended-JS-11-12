//Функцію для створення, рендеру або видалення розмітки

import { refs } from './refs';

/////////////////////////////////////////////// створення кнопок категорій
export function createMarkupList(data) {
  const allList = data
    .map(
      category => `
        <li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>        `
    )
    .join('');
  refs.categories.insertAdjacentHTML('beforeend', allList);
}

///////////////////////////////////////        розмітка  карток   продуктів

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
   </li>       `
    )
    .join('');
  refs.products.insertAdjacentHTML('beforeend', markupProducts);
}
//////////////////////////////////////////////
/////////////////////////////////////////////         розмітка  модального  вікна
//

export function renderModalProduct(product) {
  const {
    images,
    id,
    title,
    tags = [],
    description,
    shippingInformation,
    returnPolicy,
    price,
  } = product;

  const modalProductMarkup = `
      <img class="modal-product__img" src="${
        images?.[0] || ''
      }" alt="${title}" />
      <div class="modal-product__content" data-product-id="${id}">
        <p class="modal-product__title">${title}</p>
        <p class="modal-product-id hidden>${id}</p>
        <ul class="modal-product__tags">${tags
          .map(tag => `<li>${tag}</li>`)
          .join('')}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping: ${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${returnPolicy}</p>
        <p class="modal-product__price">Price: ${price} $</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>
`;
  refs.modalProduct.innerHTML = modalProductMarkup;
}
