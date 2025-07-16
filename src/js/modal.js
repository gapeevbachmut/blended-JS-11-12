//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { refs } from './refs';

import { handleClickProductsCart, globalProductCartId } from './handlers';
import { getProductsById, getProductsList } from './products-api';

//
//
//
// open модальне вікно, при кліку, на картку продукту, у хендлерс - handleClickProductsCart
//
//

export function openModal() {
  //  при відкритті модалки - що робиться!!!
  const selectProduct = globalProductCartId; // при кліку по картці було визначчено id продукту - нашо???
  console.log('modal id', selectProduct);
  if (!selectProduct) {
    //  якщо id не має
    console.warn('Товар не знайдено!');
  }
  refs.modalWindow.classList.add('modal--is-open'); //  додати клас та показати модальне вікно = бекдроп
  refs.modalContent.classList.add('modal--is-open'); // додати клас та показати контент модального вікна
  refs.modalWindow.addEventListener('click', handleClickModalWindow); // -  слухач на модальне вікно - бекдроп
  window.addEventListener('keydown', onEscKeyPress); //  - слухaч на ескейп
  refs.modalCloseBtn.addEventListener('click', handleClickModalCloseBtn); // - слухач на закриття модалки - хрестик
}

//
// що робиться при закритті модалки

function closeModalWindow() {
  refs.modalWindow.classList.remove('modal--is-open'); //  прибрати клас та сховати модальне вікно - бекдропа
  refs.modalContent.classList.remove('modal--is-open'); // прибрати клас та сховати  контент модального вікна
  refs.modalWindow.removeEventListener; //('click', handleClickModalWindow); // -  слухач на модальне вікно - бекдроп
  window.removeEventListener; //('keydown', onEscKeyPress); //  - слухaч на ескейп
  refs.modalCloseBtn.removeEventListener; // ('click', handleClickModalCloseBtn); // - слухач на закриття модалки - хрестик
}

//     обробник слухача модального вікна - бекдропа
function handleClickModalWindow(event) {
  if (event.target === event.currentTarget) {
    closeModalWindow();
  }
}

//   обробник кліку по ескейп
function onEscKeyPress(event) {
  if (event.key === 'Escape') {
    closeModalWindow();
  }
}

//  обробка при кліку на хрестик
function handleClickModalCloseBtn(event) {
  closeModalWindow();
}
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
// //
// //

// //           додавання у кошик

// //
// //   слухач на модалку, у функцію прописати клік по кнопці
// //     клік по кнопці  -  Add to cart
// refs.modalContent.addEventListener('click', handleClickModalContent);
// function handleClickModalContent(event) {
//   if (event.target.classList.contains('modal-product__btn--cart')) {
//     console.log('клік по  -  Add to cart - 2');
//   }

//   const modalProduct = event.target.closest('.modal__content');
//   if (!modalProduct) {
//     console.warn('Елемент .modal-product не знайдено');
//     return;
//   }
//   console.log(modalProduct);
//   console.log(modalProduct.dataset.id);

//   const productId = Number(modalProduct.dataset.id);
//   console.log('id', productId);

//   if (!productId) {
//     console.warn('ID продукту не визначено');
//     return;
//   }
// }

// export async function handleClickModalWindow(event) {
//   try {
//     if (event.target.classList.contains('modal-product__btn--cart')) {
//       // якщо клікнув на   Add to Cart
//       console.log('клік по  -  Add to cart');
//       // console.log(Number(globalProductCartId));
//       // отримати айді яке прийшло раніше з - handleClickProductsCart
//       //  записав айді у глобальну змінну //  перетворити з рядка на цифру

//       /////////////////////////////////////
//       const productId2 = Number(globalProductCartId);
//       console.log('id-2', productId2);

//       // if (!productId) return;

//       /////////////////////////////   що це ?

//       //   if (isInCart(productId)) {
//       //     removeFromCart(productId);
//       //     btn.textContent = 'Add to Cart';
//       //   } else {
//       //     addToCart(productId);
//       //     btn.textContent = 'Remove from Cart';
//       //   }

//       //   updateCartCounter(); // 🆕 оновлення лічильника
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// /////////////////////////////////////////////

// // export function isInCart(productId) {
// //   return getCartItems().includes(productId);
// // }
// // //  перевіряє, чи знаходиться товар у кошику. отримує поточний вміст кошика і перевіряє, чи містить масив productId. повертає true, якщо товар є в кошику, і false — якщо немає.
// // //
// // //
// // //
// // //  оновлюємо значення
// // export function updateCartCounter() {
// //   const cart = getCartItems();
// //   cartCount.textContent = cart.length;
// // }
