//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано

import { modal, modalCloseBtn, modalContent } from './refs';

export function openModal() {
  modal.classList.add('modal--is-open');

  // Додаємо слухачі
  document.addEventListener('keydown', handleEscPress);
  modal.addEventListener('click', handleBackdropClick);
  modalCloseBtn.addEventListener('click', closeModal);
}

export function closeModal() {
  modal.classList.remove('modal--is-open');

  // Видаляємо слухачі
  document.removeEventListener('keydown', handleEscPress);
  modal.removeEventListener('click', handleBackdropClick);
  modalCloseBtn.removeEventListener('click', closeModal);
}

// Обробка натискання ESC
function handleEscPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Обробка кліку по бекдропу (але не по модальному вмісту)
function handleBackdropClick(event) {
  if (!modalContent.contains(event.target)) {
    // contains() — дозволяє відрізнити клік по контенту від кліку по фону.
    closeModal();
  }
}
