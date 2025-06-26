//Обʼєкт з посиланнями на ДОМ елементи

export const refs = {};

export const categories = document.querySelector('.categories');
//  отримаємо ul.categories
export const products = document.querySelector('.products');
//  отримуємо ul.products
// export const buttons = categories.querySelectorAll('.categories__btn');
//Знаходимо всі кнопки в ul.categories

export const notFound = document.querySelector('.not-found');

export const loadMoreBtn = document.querySelector('.load-more-btn');

//     MODAL  WINDOW

export const modal = document.querySelector('.modal');
export const modalProduct = document.querySelector('.modal-product');
export const modalCloseBtn = document.querySelector('.modal__close-btn');
export const modalContent = document.querySelector('.modal__content');

//         пошук товарів

export const searchForm = document.querySelector('.search-form');
export const searchInput = document.querySelector('.search-form__input');
export const clearSearchBtn = document.querySelector('.search-form__btn-clear');

//     Коли продукт додається або видаляється — потрібно: Оновити його значення: .textContent = cart.length

export const cartCount = document.querySelector('[data-cart-count]');
