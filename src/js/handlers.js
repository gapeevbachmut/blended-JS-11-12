// Функції, які передаються колбеками в addEventListners

import { products, notFound, loadMoreBtn } from './refs'; // елемент розмітки
import {
  getProducts,
  getProductsByCategory,
  getProductById,
} from './products-api';
import { createMarkupProducts, renderModalProduct } from './render-function'; // розмітка
import { openModal } from './modal';

let currentPage = 1;
let currentCategory;

export async function handleClickCategoryBtn(event) {
  const clickedElement = event.target; // елемент на який клікнули
  // чи натиснута саме кнопка
  if (!event.target.classList.contains('categories__btn')) {
    console.log('not a btn');
    return;
  }

  const category = event.target.textContent;
  currentCategory = category; //  записую активну категорію

  /////////////////////////////              ???
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

  let items = [];
  try {
    if (category === 'All') {
      items = await getProducts(currentPage);
    } else {
      items = await getProductsByCategory(category, currentPage);
    }
    // Якщо товарів немає — показати повідомлення
    if (!items.length) {
      notFound.classList.add('not-found--visible');
      loadMoreBtn.classList.add('hidden'); //  ховаємо кнопку
      return;
    } else {
      notFound.classList.remove('not-found--visible');
    }
    console.log('btn-category', items);

    createMarkupProducts(items);

    // Показати кнопку, якщо є ще товари (рівно 12 — імовірність, що ще будуть)

    if (items.length === 12) {
      loadMoreBtn.classList.remove('hidden');
    } else {
      loadMoreBtn.classList.add('hidden');
    }
    //
  } catch (error) {
    console.log(error);
  }

  // getProducnsByCategory(category);
  // при кліку виводится назва кнопки
  // при кліку в обрану категорію потрібно прочитати текстовий контент кнопки
  // console.log('category', category);
}

//         Функція обробки Load More

export async function handleLoadMore() {
  currentPage += 1;

  try {
    let items = [];

    if (currentCategory === 'All') {
      items = await getProducts(currentPage);
    } else {
      items = await getProductsByCategory(currentCategory, currentPage);
    }

    if (!items.length) {
      loadMoreBtn.classList.add('hidden');
      return;
    }

    createMarkupProducts(items);
    console.log('btn-load-More', items);

    if (items.length < 12) {
      loadMoreBtn.classList.add('hidden');
    }
  } catch (error) {
    console.error(error);
  }
}

//       клік по картці

export async function handleClickProductCard(event) {
  const productItem = event.target.closest('.products__item');
  if (!productItem) return;

  const productId = productItem.dataset.id;
  if (!productId) return;

  try {
    const product = await getProductById(productId);
    renderModalProduct(product);
    openModal();
  } catch (error) {
    console.error('Error loading product', error);
  }
}
