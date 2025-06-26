// Функції, які передаються колбеками в addEventListners

import {
  products,
  notFound,
  loadMoreBtn,
  searchInput,
  clearSearchBtn,
} from './refs'; // елемент розмітки
import {
  getProducts,
  getProductsByCategory,
  getProductById,
  searchProducts,
} from './products-api';

import {
  addToCart,
  removeFromCart,
  isInCart,
  updateCartCounter,
} from './storage';

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

//              обробка сабміту форми пошуку

export async function handleSearchSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim();
  if (!query) return;

  try {
    const result = await searchProducts(query, 1);
    products.innerHTML = '';

    if (!result.length) {
      notFound.classList.add('not-found--visible');
      loadMoreBtn.classList.add('hidden');
    } else {
      createMarkupProducts(result);
      notFound.classList.remove('not-found--visible');
      loadMoreBtn.classList.add('hidden'); //  не використовуємо load more для пошуку
    }
  } catch (error) {
    console.error('Search error', error);
  }
}

//    обробка енопки очистити пошук

export async function handleClearSearch() {
  searchInput.value = '';
  clearSearchBtn.classList.add('hidden');

  try {
    const result = await getProducts(1);
    products.innerHTML = '';

    if (!result.length) {
      notFound.classList.add('not-found--visible');
    } else {
      createMarkupProducts(result);
      notFound.classList.remove('not-found--visible');
      loadMoreBtn.classList.remove('hidden'); //  знову показуємо load more
    }
  } catch (error) {
    console.error('Clear search error', error);
  }
}

//       Обробка кліку по кнопці в модалці

export function handleCartBtnClick(event) {
  const btn = event.target;
  const productId = Number(btn.closest('.modal-product').dataset.id);

  if (!productId) return;

  if (isInCart(productId)) {
    removeFromCart(productId);
    btn.textContent = 'Add to Cart';
  } else {
    addToCart(productId);
    btn.textContent = 'Remove from Cart';
  }

  updateCartCounter(); // оновити лічильник у хедері
}

//              Wishlist

export function handleWishlistBtnClick(event) {
  const btn = event.target;
  const productId = Number(btn.closest('.modal-product').dataset.id);
  if (!productId) return;

  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
    btn.textContent = 'Add to Wishlist';
  } else {
    addToWishlist(productId);
    btn.textContent = 'Remove from Wishlist';
  }

  updateWishlistCounter(); // оновлення лічильника
}
