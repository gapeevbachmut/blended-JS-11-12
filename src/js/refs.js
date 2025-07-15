//Обʼєкт з посиланнями на ДОМ елементи

export const refs = {
  categories: document.querySelector('.categories'), //  отримаємо ul.categories
  products: document.querySelector('.products'), //  отримуємо ul.products
  loadMoreBtn: document.querySelector('.load-more-btn'), // кнопка  load More
  notFound: document.querySelector('.not-found'),

  //           модальне вікно
  modalBackdrop: document.querySelector('modal-backdrop'),
  modalWindow: document.querySelector('.modal'),
  modalContent: document.querySelector('.modal__content'),
  modalCloseBtn: document.querySelector('.modal__close-btn'), // хрестик
  modalProduct: document.querySelector('.modal-product'),
  modalProductBtnCart: document.querySelector('.modal-product__btn--cart'), //  кнопка додавання товару у кошик

  //          пошук товарів

  searchForm: document.querySelector('.search-form'), // форма пошуку
  searchFormInput: document.querySelector('.search-form__input'), //   input
  searchClearBtn: document.querySelector('.search-form__btn-clear'), // хрестик - очищення пошуку

  //              кошик
};
