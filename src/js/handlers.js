// Функції, які передаються колбеками в addEventListners

import { products, notFound } from './refs'; // елемент розмітки
import { getProducts, getProducnsByCategory } from './products-api';
import { createMarkupProducts } from './render-function'; // розмітка

let currentPage = 1;

export async function handleClickCategoryBtn(event) {
  //делегування на списку ul.categories
  // Перевірка: натиснута саме кнопка
  if (!event.target.classList.contains('categories__btn')) {
    console.log('not a btn');
    return;
  }
  const clickedElement = event.target; // елемент на який клікнули

  const category = event.target.textContent;

  // запам`ятати активну категорію

  /////////////////////////////
  //  при кліку на одну з кнопок .categories__btn, треба:
  // Зняти клас categories__btn--active з усіх кнопок (є тільки один активний).  Додати цей клас до тієї кнопки, яку натиснули.
  //Очистити активні класи з усіх кнопок. шукає по ВСІЙ сторінці,
  document
    .querySelectorAll('.categories__btn--active')
    .forEach(btn => btn.classList.remove('categories__btn--active'));
  // Додати клас активності до нової кнопки
  clickedElement.classList.add('categories__btn--active');
  /////////////////////

  products.innerHTML = ''; // очищаємо список, якщо він був
  currentPage = 1; //  початок з першої сторінки

  let items;
  try {
    if (category === 'All') {
      items = await getProducts(currentPage);
    } else {
      items = await getProducnsByCategory(category, currentPage);
    }
    // Якщо товарів немає — показати повідомлення
    if (!items.length) {
      notFound.classList.add('not-found--visible');

      return;
    } else {
      notFound.classList.remove('not-found--visible');
    }
    // console.log('items', items);

    //
    createMarkupProducts(items);
    //

    //
  } catch (error) {
    console.log(error);
  }

  // getProducnsByCategory(category);
  // при кліку виводится назва кнопки
  // при кліку в обрану категорію потрібно прочитати текстовий контент кнопки
  // console.log('category', category);
}
