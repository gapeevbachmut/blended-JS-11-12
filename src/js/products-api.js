// Функції для роботи з бекендом

import axios from 'axios';
import { categories } from './refs';

const BASE_URL = 'https://dummyjson.com/products'; // ???
// const END_POINT_categories = '/categories';
const END_POINT_category_list = '/category-list';

// const END_POINT_pagination = `?limit=12&skip=${(currentPage - 1) * 12}`;

export async function allCategoryList() {
  const { data } = await axios(`${BASE_URL}${END_POINT_category_list}`); //  запит на сервер
  data.unshift('All'); // Додає "All" в початок масиву категорій

  return data;
}

export async function getProducts(currentPage = 1) {
  const { data } = await axios(
    `${BASE_URL}?limit=12&skip=${(currentPage - 1) * 12}`
  );
  // console.log('1', data.products);

  return data.products;
}
// https://dummyjson.com/products/category/smartphones
//  запит на сервер ждя отримання списку по категоріях
//  зробити запит по ендпоінту №6 підставивши в url прочитану категорію.
//  отриманий масив обʼєктів продуктів потрібно відрендерити в списку ul.products з пагінацією 12 продуктів на сторінку

export async function getProducnsByCategory(category, currentPage = 1) {
  const { data } = await axios(
    `${BASE_URL}/category/${category}?limit=12&skip=${(currentPage - 1) * 12}`
  );
  // console.log('2', data.products);
  console.log(category);

  return data.products;
}
