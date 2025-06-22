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

import { handleClickCategoryBtn } from './js/handlers';
import { categories } from './js/refs';
import {
  allCategoryList,
  getProducns,
  getProducnsByCategory,
} from './js/products-api';
import { createMarkupList, createMarkupProducts } from './js/render-function';

categories.addEventListener('click', handleClickCategoryBtn);

async function initPage() {
  try {
    const data = await allCategoryList();
    console.log(data); //отримаємо масив значень  - список усіх категорій
    createMarkupList(data);

    const products = await getProducns();
    createMarkupProducts(products);
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: error.message,
    });
  }
}
initPage();

//2. При завантаженні сторінки Home отримай товари з API:
// Зроби запит на ендпоінт №2 та отримай масив обʼєктів товарів, де skip = (поточна сторінка - 1) * 12. Приклад: для сторінки 2 → skip=12, для сторінки 3 → skip=24.

//Відобрази товари на сторінці Home (пагінація: 12 товарів на сторінку).
//  Використай HTML-шаблон товару для створення розмітки списку товарів і метод map() для перебору масиву товарів, який приходить з бекенду. Доповни шаблон необхідними даними і встав розмітку в ul.products.
//
// Реалізуй делегування на списку ul.categories

// при кліку в обрану категорію потрібно прочитати текстовий контент кнопки і зробити запит по ендпоінту №6 підставивши в url прочитану категорію.
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
