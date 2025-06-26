//Логіка сторінки Home

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  handleClickCategoryBtn,
  handleLoadMore,
  handleClickProductCard,
  handleSearchSubmit,
  handleClearSearch,
  handleCartBtnClick,
  handleWishlistBtnClick,
} from './js/handlers';

import {
  categories,
  loadMoreBtn,
  products,
  searchForm,
  searchInput,
  clearSearchBtn,
  notFound,
  cartCount,
  wishlistCount,
  // themeToggleBtn,
} from './js/refs';

import {
  allCategoryList,
  getProducts,
  getProductById,
  getProductsByCategory,
} from './js/products-api';

import { createMarkupList, createMarkupProducts } from './js/render-function';
// import { toggleTheme } from './js/helpers';

import {
  updateCartCounter,
  updateWishlistCounter,
  getWishlistItems,
  getCartItems,
} from './js/storage';

updateCartCounter(); // одразу оновлюємо лічильник при завантаженні
updateWishlistCounter(); // Ініціалізація лічильника при завантаженні
initWishlistPage(); // Запуск сторінки
initCartPage();
//
//
//
const cartItemsEl = document.querySelector('[data-cart-items]');
const cartTotalEl = document.querySelector('[data-cart-total]');
// const buyBtn = document.querySelector('.buy-btn'); // cart-summary__btn
const buyBtn = document.querySelector('.cart-summary__btn'); //

const loader = document.querySelector('.loader');
const scrollUpBtn = document.querySelector('.scroll-up-btn');
//
//
categories.addEventListener('click', handleClickCategoryBtn); //  кнопки - категорії
products.addEventListener('click', handleClickProductCard); //  відмалювання карток продуктів
loadMoreBtn.addEventListener('click', handleLoadMore); // кнопка  ЩЕ
searchForm.addEventListener('submit', handleSearchSubmit); //  сабміт форми
clearSearchBtn.addEventListener('click', handleClearSearch); // Слухач на кнопку "×"
//
// themeToggleBtn.addEventListener('click', toggleTheme);
// const themeToggleBtn = document.querySelector('.theme-toggle-btn');
// Слухач на input — показати/сховати ×
searchInput.addEventListener('input', () => {
  if (searchInput.value.trim()) {
    clearSearchBtn.classList.remove('hidden');
  } else {
    clearSearchBtn.classList.add('hidden');
  }
});
//

// Додаємо делегування на кнопку cart в модалці
document.addEventListener('click', event => {
  if (event.target.classList.contains('modal-product__btn--cart')) {
    handleCartBtnClick(event);
  }
});

//             слухач для wishlist-кнопки
//              Клік по кнопці Wishlist в модалці
document.addEventListener('click', event => {
  if (event.target.classList.contains('modal-product__btn--wishlist')) {
    handleWishlistBtnClick(event);
  }
  if (event.target.classList.contains('modal-product__btn--cart')) {
    handleCartBtnClick(event);
  }
});
//

document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-product__btn--cart')) {
    handleCartBtnClick(e);
  }
  if (e.target.classList.contains('modal-product__btn--wishlist')) {
    handleWishlistBtnClick(e);
  }
});

// buyBtn.addEventListener('click', () => {
//   iziToast.success({
//     title: 'Success',
//     message: 'Your purchase was successful! 🎉',
//     position: 'topRight',
//   });
// });

// scrollUpBtn.addEventListener('click', () => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// });

// document.addEventListener('DOMContentLoaded', () => {
//   applySavedTheme();
// });

let currentPage = 1;
let currentCategory = 'All'; // за замовчуванням

async function initPage() {
  try {
    const data = await allCategoryList();
    console.log(data); //отримаємо масив значень  - список усіх категорій
    createMarkupList(data);

    const products = await getProducts();
    // createMarkupProducts(products); // за замовчуванням відображає перші товари
    // console.log('3', products);

    //  отриманий масив обʼєктів продуктів потрібно відрендерити в списку ul.products з пагінацією 12 продуктів на сторінку

    //  це нічого не робить
    // const productsOfCategory = await getProducnsByCategory();
    // createMarkupProducts(productsOfCategory);
    //
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: error.message,
    });
  }
}
initPage();

//
//
/////////////////////////////////////////////
//
//
//
async function initWishlistPage() {
  const ids = getWishlistItems();
  products.innerHTML = '';

  if (!ids.length) {
    notFound.classList.add('not-found--visible');
    return;
  }

  try {
    const promises = ids.map(id => getProductById(id));
    const items = await Promise.all(promises);

    createMarkupProducts(items);
    notFound.classList.remove('not-found--visible');
  } catch (error) {
    console.error('Error loading wishlist:', error);
    notFound.classList.add('not-found--visible');
  }

  updateCartCounter();
  updateWishlistCounter();
}

////////////////////////////////

async function initCartPage() {
  const ids = getCartItems();
  products.innerHTML = '';
  notFound.classList.remove('not-found--visible');
  cartItemsEl.textContent = '0';
  cartTotalEl.textContent = '$0';
  loader.classList.remove('hidden');

  if (!ids.length) {
    notFound.classList.add('not-found--visible');
    loader.classList.add('hidden');
    return;
  }

  try {
    const promises = ids.map(id => getProductById(id));
    const items = await Promise.all(promises);

    createMarkupProducts(items);

    // Update totals
    cartItemsEl.textContent = items.length;
    cartTotalEl.textContent =
      '$' + items.reduce((sum, item) => sum + item.price, 0);

    updateCartCounter();
    updateWishlistCounter();
  } catch (error) {
    console.error('Cart error:', error);
    notFound.classList.add('not-found--visible');
  } finally {
    loader.classList.add('hidden');
  }
}
