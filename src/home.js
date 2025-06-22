//Логіка сторінки Home

//  1. При завантаженні сторінки Home отримай категорії товарів з API:
//  Зроби запит на ендпоінт №5, отримай масив категорій. На початок отриманого масиву додай рядок “All” і відрендери категорії в списку ul.categories . Шаблон категорії:
//  <li class="categories__item">
//     <button class="categories__btn" type="button"></button>
//   </li>
//  Стилізація списку категорій вже є в шаблоні репозиторію.

////////////////////////////////////////////////////////////////////////////////

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { allCategoryList } from './js/products-api';

import { markupList } from './js/render-function';

async function initPage() {
  try {
    const data = await allCategoryList();
    console.log(data); //отримаємо масив значень  - список усіх категорій
    markupList(data);
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
//
//
//
//
//
//
//
//
//

// зробити запит на сервер для отримання усіх категорій

// async function allCategories() {
//   const { data } = await axios(`${BASE_URL}${END_POINT_categories}`);
//   // { data } - it is response.data
//   return data;
// }
// //  категорії продуктів  має властивості - name    slug       url
// allCategories()
//   .then(data => {
//     console.log(data); //отримаємо масив об'єктів з категоріями продуктів
//   })
//   .catch(error => {
//     console.log(error.message);
//   });

//                               список категорій товарів - /category-list

// ТЗ - При завантаженні основної сторінки в списку ul.categories рендериться список категорій продуктів, отриманих з бекенду.

// ТЗ -  В списку ul.products рендериться список продуктів, отриманих з бекенда (з пагінацією 12 товарів).
// треба обрати елемент зі писку та додати для відображення у наступну функцію - ???

//  запит на сервер - список продуктів (з пагінацією 12 товарів)

// async function allProducts() {
//   const { data } = await axios(`${BASE_URL}?limit=12`);
//   // { data } - it is response.data
//   return data;
// }

// allProducts()
//   .then(data => {
//     console.log('1', data); // цікавить - products
//     console.log(data.products); // масив об'єктів
//   })
//   .catch(error => {
//     console.log(error.message);
//   });

//
// ТЗ - Після списку продуктів зʼявляється кнопка loadMore для завантаження наступної порції продуктів. Якщо на бекенді не залишилось продуктів, кнопка loadMore приховується і зʼявляється повідомлення. Для повідомлень використовуємо бібліотеку iziToast.

// у HTML додати розмітку кнопки loadMore  після  ul.products (hidden)
// на цю кнопку вішаємо слухач та прописуємо функцію

// const loadMore = document.querySelector('.load-more-btn');

// loadMore.addEventListener('click', handleClickMore);

// async function handleClickMore(event) {
//   event.preventDefault();

//   // loadMore.classList.remove('hidden');
//   // loadMore.disabled = false;
// }
////////////////////////////////////////////////////////////////////////////////

//  1. При завантаженні сторінки Home отримай категорії товарів з API:

//  Зроби запит на ендпоінт №5, отримай масив категорій. На початок отриманого масиву додай рядок “All” і відрендери категорії в списку ul.categories . Шаблон категорії:
//  <li class="categories__item">
//     <button class="categories__btn" type="button"></button>
//   </li>

//  Стилізація списку категорій вже є в шаблоні репозиторію.
