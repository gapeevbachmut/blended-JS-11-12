//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { refs } from './refs';

import { handleClickProductsCart, globalProductCartId } from './handlers';
import { getProductsById, getProductsList } from './products-api';

//  переписати код
//

// В мене є елементи:
// Модальне вікно   - modal__content - modalContent
// Кнопка закриття – хрестик -  modalCloseBtn
// Бекдроп - modal - modalWindow
// Сдухач на хрестик
// При відкритті модального вікна:
// На модальне вікно додаеться із опен  - модалка відмальовується
// Класс із опен переставити на модал контент
// Додається слухач на  ескейп
// Додається слухач на бекдроп ???
// При закритті модального вікна:
// З модалки прибирається із опен – модалка зникає
// Прибирається слухач з ескейп
// Прибирається слухач з бекдропа
// При кліку на ескейп вмикаємо функцію закриття модального вікна
// При кліку на бекдроп вмикаємо закриття вікна
// open модальне вікно, при кліку, на картку продукту, у хендлерс
/////////////////////////////////////////////////////////////////

// слухач на хрестик
refs.modalCloseBtn.addEventListener('click', closeModal);

export function openModal() {
  refs.modalWindow.classList.add('modal--is-open');
  // слухач на ескейп
  window.addEventListener('keydown', onEscKeyPress);
  // слухач на бекдроп
  refs.modalBackdrop.addEventListener('click', onBackdropClick);
}

export function closeModal() {
  // ховаємо модадку
  refs.modalWindow.classList.remove('modal--is-open');
  // прибираємо слухачі
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modalBackdrop.removeEventListener('click', onBackdropClick);
}

// Закриття по Escape
function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Закриття по кліку на бекдроп
function onBackdropClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

//при кліку на хрестик прибрати з модалки клас опен, додати сдухач на хрестик
export function handleClickModalCloseBtn(event) {
  refs.modalWindow.classList.remove('modal--is-open');
  // console.log('fun-close');
}
handleClickModalCloseBtn(); // перенести

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////

//
//
// додати закриття при кліку за модалкою, та ескейпом
//
//

//           додавання у кошик

//
//   слухач на модалку, у функцію прописати клік по кнопці
//     клік по кнопці  -  Add to cart
refs.modalContent.addEventListener('click', handleClickModalContent);
function handleClickModalContent(event) {
  if (event.target.classList.contains('modal-product__btn--cart')) {
    console.log('клік по  -  Add to cart - 2');
  }

  const modalProduct = event.target.closest('.modal__content');
  if (!modalProduct) {
    console.warn('Елемент .modal-product не знайдено');
    return;
  }
  console.log(modalProduct);
  console.log(modalProduct.dataset.id);

  const productId = Number(modalProduct.dataset.id);
  console.log('id', productId);

  if (!productId) {
    console.warn('ID продукту не визначено');
    return;
  }
}

export async function handleClickModalWindow(event) {
  try {
    if (event.target.classList.contains('modal-product__btn--cart')) {
      // якщо клікнув на   Add to Cart
      console.log('клік по  -  Add to cart');
      // console.log(Number(globalProductCartId));
      // отримати айді яке прийшло раніше з - handleClickProductsCart
      //  записав айді у глобальну змінну //  перетворити з рядка на цифру

      /////////////////////////////////////
      const productId2 = Number(globalProductCartId);
      console.log('id-2', productId2);

      // if (!productId) return;

      /////////////////////////////   що це ?

      //   if (isInCart(productId)) {
      //     removeFromCart(productId);
      //     btn.textContent = 'Add to Cart';
      //   } else {
      //     addToCart(productId);
      //     btn.textContent = 'Remove from Cart';
      //   }

      //   updateCartCounter(); // 🆕 оновлення лічильника
    }
  } catch (error) {
    console.log(error);
  }
}

/////////////////////////////////////////////

// export function isInCart(productId) {
//   return getCartItems().includes(productId);
// }
// //  перевіряє, чи знаходиться товар у кошику. отримує поточний вміст кошика і перевіряє, чи містить масив productId. повертає true, якщо товар є в кошику, і false — якщо немає.
// //
// //
// //
// //  оновлюємо значення
// export function updateCartCounter() {
//   const cart = getCartItems();
//   cartCount.textContent = cart.length;
// }
