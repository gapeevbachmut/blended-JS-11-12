// Функції, які передаються колбеками в addEventListners

import { refs } from './refs';
import { openModal } from './modal';
import {
  getProductsByCategory,
  getProductsList,
  getProductsById,
  getSearchProducts,
} from './products-api';
import { createMarkupProducts, renderModalProduct } from './render-function';

//

let currentPage = 1; // тут зберігаємо поточну сторінку
let currentCategory; // категорія при кліку на кнопку

//
//
//                          клік  по кнопці  категорій
//
//

export async function handleClickCategoriesBtn(event) {
  // console.log('click', event.target); // там де клік
  //
  // чи натиснута саме кнопка
  if (!event.target.classList.contains('categories__btn')) {
    // я кщо клік не на кнопку - зупинити функцію
    // console.log('not btn');
    return;
  }

  const category = event.target.textContent; // текст кнопки
  currentCategory = category; //у глобальну область

  //  видаляю клас актів з усіх кнопок

  const categoriesBtnAll = document.querySelectorAll('.categories__btn'); // тільки тут, т.як це динамічний елемент
  categoriesBtnAll.forEach(btn =>
    btn.classList.remove('categories__btn--active')
  );

  // додаю актів на кнопку яку клікнув

  event.target.classList.add('categories__btn--active');

  //
  refs.products.innerHTML = ''; // очищає стару розмітку
  currentPage = 1; //  щоб кожного разу початок з першої сторінки

  let listOfProducts = []; // зберігаю виклик по категорії або all

  try {
    // що відмалювати при натисканні кнопки
    if (category === 'All') {
      // кнопка "all"
      listOfProducts = await getProductsList(currentPage); //  запит на сервер
      // console.log(category);
      // console.log(listOfProducts);
    } else {
      // інші кнопки
      listOfProducts = await getProductsByCategory(category, currentPage); //  запит на сервер
      // console.log(category);
      // console.log(listOfProducts);
    }
    //

    // Якщо товарів немає — показати повідомлення
    if (!listOfProducts.length) {
      refs.notFound.classList.add('not-found--visible');
      refs.loadMoreBtn.classList.add('hidden'); //  ховаємо кнопку
      return;
    } else {
      refs.notFound.classList.remove('not-found--visible');
    }

    // треба відмалювати отриманий масив по 12 шт,  -   createMarkupProducts(dataProducts);
    // але перед цим очистити розмітку - refs.products.innerHTML = '';
    createMarkupProducts(listOfProducts); // роблю розмітку

    // Показати кнопку, якщо є ще товари (рівно 12 — імовірність, що ще будуть) - ???

    if (listOfProducts.length === 12) {
      refs.loadMoreBtn.classList.remove('hidden');
    } else {
      refs.loadMoreBtn.classList.add('hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

//
//
//                        Функція обробки Load More
//
//

export async function handleClickLoadMore(event) {
  currentPage++;

  try {
    //////////////////////  !!!!!!!!!!
    let moreOfProducts = []; // зберігаю виклик по категорії або усі
    if (currentCategory === 'All') {
      // якщо категорія = all являється  true
      moreOfProducts = await getProductsList(currentPage); // запит на список ВСІХ продуктів
    } else {
      //  якщо інша категорія
      moreOfProducts = await getProductsByCategory(
        // запит на список продуктів та поточна сторінка
        currentCategory,
        currentPage
      );
    }

    if (!moreOfProducts.length) {
      //якщо масив пустий - ховаємо кнопку
      refs.loadMoreBtn.classList.add('hidden');
      return;
    }

    /////           додатково/окремо  для  пошуку -  сабміт форми

    if (isSearchMode) {
      const moreProducts = await getSearchProducts(
        currentSearchQuery,
        currentPage
      ); // додає товари до списку
    }

    /////

    createMarkupProducts(moreOfProducts);
    console.log('btnLoad', moreOfProducts);

    if (moreOfProducts.length < 12) {
      refs.loadMoreBtn.classList.add('hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

//
//
//                               клік по картці продукта  -  модальне вікно
//
//
//
export let globalProductCartId;

// обробник при кліку на картку продукту, на головній сторінці
export async function handleClickProductsCart(event) {
  // console.log('click', event.target);
  // зробити клік по картці з усім вмістом

  const productCartItem = event.target.closest('.products__item'); //  на яку саме картку був клік

  if (!productCartItem) {
    // зупинити якщо не картка
    return;
  }

  // взяти id картки
  const productCartId = productCartItem.dataset.id;

  if (!productCartId) {
    // зупинити якщо немає id
    return;
  }

  try {
    //  зробити запит на сервер по id
    const product = await getProductsById(productCartId); // запит з id продукту
    console.log('id', productCartId);
    // console.log('product', product);

    globalProductCartId = productCartId;

    //  відмалювати розмітку модального вікна
    renderModalProduct(product);

    //  відкрити модальне вікно - прописати функцію відкриття у modal.js
    openModal(productCartId); // передаємо id продукту
  } catch (error) {
    console.log(error);
  }
}

//////////////////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//
//
//                           форма пошуку продуктів
//
//
let isSearchMode = false;
let currentSearchQuery = '';
//   для Load More
//
//

export async function handleSubmitSearchForm(event) {
  event.preventDefault();

  //https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
  //  при сабміті запит на бекенд по ендпоінту №4 підставивши value інпута в url.
  //  отримати інпут та цйого значення, підставити це значення у запит на сервер

  // console.log('form', refs.searchFormInput.value.trim()); // при кліку по кнопці обирається введене значення
  const queryInput = refs.searchFormInput.value.trim(); //    отримати значення інпута

  if (!queryInput || '') {
    //якщо пустий рядок або запит
    return;
  }
  console.log(queryInput);

  try {
    const searchProducts = await getSearchProducts(
      queryInput,
      (currentPage = 1)
    ); //викликаю функцію запиту, передаю їй параметр пошуку (інпут) -
    console.log(searchProducts); //  отримую масив об'єктів  за запитом

    // викликати розмітку та передати їй отриманий масив
    refs.products.innerHTML = ''; // очищає стару розмітку

    createMarkupProducts(searchProducts); // зробити розмітку - передати результат запиту на сервер

    // додати кнопку ЩЕ
    isSearchMode = true;
    currentSearchQuery = queryInput;
    currentPage = 1;
    //

    if (!searchProducts.length) {
      refs.notFound.classList.add('not-found--visible');
      refs.loadMoreBtn.classList.add('hidden');
    } else {
      refs.notFound.classList.remove('not-found--visible');
      refs.loadMoreBtn.classList.remove('hidden'); //   використовуємо load more для пошуку
    }
  } catch (error) {
    console.log(error);
  }
}

//
//
//                     хрестик - очищення  input  пошуку
//
//
export async function handleSearchClearBtn(event) {
  refs.searchFormInput.value = ''; // очищаю інпут

  try {
    const startResult = await getProductsList(1); //  запит на сервер - як з початку
    refs.products.innerHTML = ''; //  очистити розмітку
    createMarkupProducts(startResult); //  відмалювати розмітку
    refs.notFound.classList.remove('not-found--visible'); // приховати div notFound
  } catch (error) {
    console.log(error);
  }
}
