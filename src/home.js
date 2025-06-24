//Логіка сторінки Home

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  handleClickCategoryBtn,
  handleLoadMore,
  handleClickProductCard,
} from './js/handlers';

import { categories, loadMoreBtn, products } from './js/refs';

import {
  allCategoryList,
  getProducts,
  getProductsByCategory,
} from './js/products-api';

import { createMarkupList, createMarkupProducts } from './js/render-function';

categories.addEventListener('click', handleClickCategoryBtn);
products.addEventListener('click', handleClickProductCard);
loadMoreBtn.addEventListener('click', handleLoadMore);

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
