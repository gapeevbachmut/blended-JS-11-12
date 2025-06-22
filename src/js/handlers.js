// Функції, які передаються колбеками в addEventListners

import { getProducnsByCategory } from './products-api';

export function handleClickCategoryBtn(event) {
  if (!event.target.classList.contains('categories__btn')) {
    console.log('not a btn');
    return;
  }
  const category = event.target.textContent;
  getProducnsByCategory(category);
  console.log(category);
}
