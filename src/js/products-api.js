// Функції для роботи з бекендом
import axios from 'axios';
import { categories } from './refs';

const BASE_URL = 'https://dummyjson.com/products'; // ???
// const END_POINT_categories = '/categories';
const END_POINT_category_list = '/category-list';

// const END_POINT_pagination = `?limit=12&skip=${(currentPage - 1) * 12}`;

export async function allCategoryList() {
  const { data } = await axios(`${BASE_URL}${END_POINT_category_list}`);
  data.unshift('All');
  return data;
}

export async function getProducns(currentPage = 1) {
  const { data } = await axios(
    `${BASE_URL}?limit=12&skip=${(currentPage - 1) * 12}`
  );
  console.log('1', data.products);

  return data.products;
}
// https://dummyjson.com/products/category/smartphones

export async function getProducnsByCategory(category, currentPage = 1) {
  const { data } = await axios(
    `${BASE_URL}/category/${category}?limit=12&skip=${(currentPage - 1) * 12}`
  );
  return data.products;
}
