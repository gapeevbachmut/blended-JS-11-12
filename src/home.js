//Логіка сторінки Home

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { createMarkupList, createMarkupProducts } from './js/render-function';

import { getAllCategoryList, getProductsList } from './js/products-api';

import { refs } from './js/refs';

import {
  handleClickCategoriesBtn,
  handleClickLoadMore,
  handleClickProductsCard,
  handleSubmitSearchForm,
  handleSearchClearBtn,
} from './js/handlers';

//

refs.categories.addEventListener('click', handleClickCategoriesBtn); // кнопки з категоріями товарів
refs.loadMoreBtn.addEventListener('click', handleClickLoadMore); // кнопка Load More
refs.products.addEventListener('click', handleClickProductsCard); // картка продукта - модальне вікно
// refs.modalCloseBtn.addEventListener('click', handleClickModalCloseBtn); // кнопка закриття модалки
refs.searchForm.addEventListener('submit', handleSubmitSearchForm); // сабміт форми
refs.searchClearBtn.addEventListener('click', handleSearchClearBtn); // Слухач на кнопку "×"

// ???
let currentPage = 1;
let currentCategory = 'All';

///////////////////// створення стартової сторінки

async function initMainPage() {
  try {
    const categoryList = await getAllCategoryList(); // отримуємо значення
    // console.log('categoryList', categoryList); //отримаємо масив значень  - список усіх категорій
    createMarkupList(categoryList); // відмальовуємо кнопки

    const productsList = await getProductsList(); // отримуємо  масив продуктів
    // console.log('productsList', productsList);  масив об'ктів - продуктів
    createMarkupProducts(productsList); // відмальовуємо продукти
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: error.message,
    });
  }
}
initMainPage();

//////////////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!
