//Константи

//

export const STORAGE_KEYS = {};

export let currentPage = 1;

export const BASE_URL = 'https://dummyjson.com/products';
export const END_POINT = {
  category_list: '/category-list ',
  // id: '/:id', //                              id   -  ???
  // categories: `/category/${category}?limit=12&skip=${(currentPage - 1) * 12}`,
  //   pagination: `?limit=12&skip=${(currentPage - 1) * 12}`,
  // search: `/search?q=${encodeURIComponent(query)}&limit=12&skip=${ (currentPage - 1) * 12 }`,
};
