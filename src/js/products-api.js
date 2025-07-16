// Функції для роботи з бекендом

import axios from 'axios';

import { BASE_URL, END_POINT } from './constants';

import { handleSubmitSearchForm } from './handlers';

const productCartId = '/:id'; // ???  з енд поінтом не працює, якщо записати туди id   ???

// створити функції для усіх необхідних запитів на  сервер

/////////////////////////////////////////////// запит на сервер для отримання списку категорій (для кнопок)
export async function getAllCategoryList() {
  const { data } = await axios(`${BASE_URL}${END_POINT.category_list}`); //  запит на сервер
  data.unshift('All'); // Додає "All" в початок масиву категорій
  console.log('список категорій для кнопок', data);

  return data;
}

/////////////////////////////////////////////  запит на список продуктів з пагінацією

export async function getProductsList(currentPage = 1) {
  const { data } = await axios(
    `${BASE_URL}?limit=12&skip=${(currentPage - 1) * 12}`
  );
  return data.products;
}

////////////////////////////////////////////// запит на сервер по категорії з пагінацією

export async function getProductsByCategory(category, currentPage = 1) {
  const { data } = await axios(
    `${BASE_URL}/category/${category}?limit=12&skip=${(currentPage - 1) * 12}`
  );
  // console.log(data.products); // отримаємо масив продуктів за категорією
  return data.products;
}
///////////////////////////////////////////////////////////

// запит на ендпоінт по id

export async function getProductsById(productCartId) {
  const { data } = await axios(`${BASE_URL}/${productCartId} `);
  // console.log('getProductsById', data); // отримую об'єкт продукта
  // console.log('data', data);

  return data;
}
//
//
//  запит по пошуку
//https://dummyjson.com/products/search?q=nail - пошук продукту по ключовому слову
//  при сабміті запит на бекенд по ендпоінту №4 підставивши value інпута в url.
//
//
// параметр з інпута - що шукає користувач

export async function getSearchProducts(queryInput, currentPage = 1) {
  const { data } = await axios(
    `${BASE_URL}/search?q=${queryInput}&limit=12&skip=${(currentPage - 1) * 12}`
  );
  // console.log(data.products); //  отримаю масив продуктів за запитом
  return data.products;
}
