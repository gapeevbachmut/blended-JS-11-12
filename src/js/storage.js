//Робота з loacalStorage

const CART_KEY = 'cart';

import { cartCount } from './refs';

export function getCartItems() {
  const raw = localStorage.getItem(CART_KEY);
  return raw ? JSON.parse(raw) : [];
}
//  зчитує збережені дані з localStorage (товари з кошика) за ключем CART_KEY ('cart'). Якщо дані є, вона перетворює їх з JSON-рядка на JavaScript-масив і повертає його; в іншому випадку повертає порожній масив.

export function addToCart(productId) {
  const cart = getCartItems();
  if (!cart.includes(productId)) {
    cart.push(productId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}
//  додає товар до кошика. спочатку отримує поточний вміст кошика. якщо товар з вказаним productId ще не знаходиться в кошику, вона додає його і оновлює дані в localStorage.

export function removeFromCart(productId) {
  const cart = getCartItems().filter(id => id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
//  видаляє товар з кошика. отримує поточний вміст кошика, фільтрує його, залишаючи тільки ті товари, id яких не дорівнює productId, і потім оновлює кошик у localStorage новим, відфільтрованим масивом.

export function isInCart(productId) {
  return getCartItems().includes(productId);
}
//  перевіряє, чи знаходиться товар у кошику. отримує поточний вміст кошика і перевіряє, чи містить масив productId. повертає true, якщо товар є в кошику, і false — якщо немає.
//

//  оновлюємо значення
export function updateCartCounter() {
  const cart = getCartItems();
  cartCount.textContent = cart.length;
}
