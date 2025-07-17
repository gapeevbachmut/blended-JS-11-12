//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { refs } from './refs';
import {
  getStorageArray,
  addToStorageId,
  removeFromStorageId,
  isInStorageId,
  CART_KEY,
  WISHLIST_KEY,
} from './storage';
import { handleClickProductsCard } from './handlers';
import { getProductsById, getProductsList } from './products-api';

//
//              лічильник

export function updateNavCounter(key) {
  const items = getStorageArray(key);
  let selector;
  // console.log('1', items); // те що у локальному сховищі

  // Визначаю  селектор за ключем  -  тобто - куди буде заноситися цифра
  if (key === CART_KEY) {
    selector = '[data-cart-count]';
  } else if (key === WISHLIST_KEY) {
    selector = '[data-wishlist-count]';
  } else {
    return; // якщо ключа немає — стоп
  }

  const countEl = document.querySelector(selector);
  // console.log('2', selector);  // cart  or  wish

  // відобразити кількість товарів
  if (countEl) {
    countEl.textContent = items.length;
  }
  //  не сам - не дуже зрозумів      :(
  //Якщо countEl знайдено — оновлюємо число товарів,
  // яке взяли з localStorage (функція getStorageArray(key) повертає масив,
  // і ми беремо .length
}
//
//
// open модальне вікно, при кліку, на картку продукту, у хендлерс - handleClickProductsCard
//
//

export function openModal() {
  //  при відкритті модалки - що робиться!!!

  refs.modalWindow.classList.add('modal--is-open'); //  додати клас та показати модальне вікно = бекдроп
  refs.modalContent.classList.add('modal--is-open'); // додати клас та показати контент модального вікна
  document.body.style.overflow = 'hidden'; // викл прокрутка

  refs.modalWindow.addEventListener('click', handleClickModalWindow); // -  слухач на модальне вікно - бекдроп
  window.addEventListener('keydown', onEscKeyPress); //  - слухaч на ескейп
  refs.modalCloseBtn.addEventListener('click', handleClickModalCloseBtn); // - слухач на закриття модалки - хрестик

  // тут буду слухати кнопки
  refs.modalContent.addEventListener('click', onModalBtnClick);

  updateModalButtons(); //       перевірка кнопок cart and wish
  //Після відкриття — одразу перевіряю стан кнопок (чи вже є товар у cart/wishlist)
}

//
// що робиться при закритті модалки
//

function closeModalWindow() {
  refs.modalWindow.classList.remove('modal--is-open'); //  прибрати клас та сховати модальне вікно - бекдропа
  refs.modalContent.classList.remove('modal--is-open'); // прибрати клас та сховати  контент модального вікна

  document.body.style.overflow = ''; // + прокрктка

  refs.modalWindow.removeEventListener('click', handleClickModalWindow); // -  слухач на модальне вікно - бекдроп
  window.removeEventListener('keydown', onEscKeyPress); //  - слухaч на ескейп
  refs.modalCloseBtn.removeEventListener('click', handleClickModalCloseBtn); // - слухач на закриття модалки - хрестик
  refs.modalContent.removeEventListener('click', onModalBtnClick); // прибираю слухач з  контента / cart та wish
}

//
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
// ловимо кнопки cart and wish

function onModalBtnClick(event) {
  const modalProductContent = document.querySelector('.modal-product__content');

  const productId = Number(modalProductContent.dataset.productId);

  // коли клік по кнопці "Add to Cart"
  if (event.target.classList.contains('modal-product__btn--cart')) {
    // перевіряю що натиснута саме Add to Cart
    if (!isInStorageId(CART_KEY, productId)) {
      // перевіряю що не має такого id у сховищі
      addToStorageId(CART_KEY, productId); // додаю у сховище id продукту
      event.target.textContent = 'Remove from Cart'; // міняю текст кнопки
      // console.log('додати');
    } else {
      // якщо такий id є у сховищі - видаляю його (id) - та змінюю текст кнопки

      removeFromStorageId(CART_KEY, productId);
      event.target.textContent = 'Add to Cart';
      // console.log('видалити');
    }
    updateNavCounter(CART_KEY); //
    // Оновлюємо лічильник корзини у шапці
  }

  //
  // Те саме для Wishlist:
  if (event.target.classList.contains('modal-product__btn--wishlist')) {
    if (!isInStorageId(WISHLIST_KEY, productId)) {
      addToStorageId(WISHLIST_KEY, productId);
      event.target.textContent = 'Remove from Wishlist';
    } else {
      removeFromStorageId(WISHLIST_KEY, productId);
      event.target.textContent = 'Add to Wishlist';
    }
    updateNavCounter(WISHLIST_KEY); // оновлюю бажання
  }
}
//
//
//  оновлюю стани кнопок при відкритті
//

function updateModalButtons() {
  const modalProductContent = document.querySelector('.modal-product__content');

  //  productId = Отримую ID поточного продукту в модалці
  const productId = Number(modalProductContent.dataset.productId);
  // console.log('productId', productId);

  // 	визначаю кнопки
  const cartBtn = document.querySelector('.modal-product__btn--cart');
  const wishlistBtn = document.querySelector('.modal-product__btn--wishlist');

  if (cartBtn) {
    //  перевіряю по id чи є такий продукт - та міняю текст кнопки
    cartBtn.textContent = isInStorageId(CART_KEY, productId)
      ? 'Remove from Cart'
      : 'Add to Cart';
  }

  if (wishlistBtn) {
    wishlistBtn.textContent = isInStorageId(WISHLIST_KEY, productId)
      ? 'Remove from Wishlist'
      : 'Add to Wishlist';
  }
  // Якщо товар уже додано — кнопка показує "Remove from ..."
  // Якщо ні — показує "Add to ..."
}

//
//
//
//
//
//
