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
} from './js/handlers';

import {
  categories,
  loadMoreBtn,
  products,
  searchForm,
  searchInput,
  clearSearchBtn,
} from './js/refs';

import {
  allCategoryList,
  getProducts,
  getProductsByCategory,
} from './js/products-api';

import { createMarkupList, createMarkupProducts } from './js/render-function';

import { updateCartCounter } from './js/storage';

updateCartCounter(); // одразу оновлюємо лічильник при завантаженні

categories.addEventListener('click', handleClickCategoryBtn); //  кнопки - категорії
products.addEventListener('click', handleClickProductCard); //  відмалювання карток продуктів
loadMoreBtn.addEventListener('click', handleLoadMore); // кнопка  ЩЕ
searchForm.addEventListener('submit', handleSearchSubmit); //  сабміт форми
clearSearchBtn.addEventListener('click', handleClearSearch); // Слухач на кнопку "×"
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

//
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
