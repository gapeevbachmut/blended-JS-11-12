// Функції для роботи з бекендом
import axios from 'axios';

export async function allCategoryList() {
  const { data } = await axios(`${BASE_URL}${END_POINT_category_list}`);
  data.unshift('All');
  return data;
}

const BASE_URL = 'https://dummyjson.com/products'; // ???
// const END_POINT_categories = '/categories';
const END_POINT_category_list = '/category-list';
