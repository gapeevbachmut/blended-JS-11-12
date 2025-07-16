//Робота з loacalStorage

export const CART_KEY = 'cart';
export const WISHLIST_KEY = 'wishlist';

//  треба зробити додавання до кошику, видалення, перевірка id , або до бажаного

// зберігою дані у сховище
export function saveToStorage(key, dataArray) {
  // кладу у сховище отримані дані
  // та перетворюю дані у рядок
  localStorage.setItem(key, JSON.stringify(dataArray));
}

// отримую дані зі сховища за ключем
export function getStorsgeArray(key) {
  // там рядок - перетворюю на масив
  // на початку коли даних ще немає отримую порожній масив
  return JSON.parse(localStorage.getItem(key)) || [];
}

//
//
//  додаю id до збереженого масиву, якщо його немає
//   та знову зберігаю масив у сховище
export function addToStorageId(key, id) {
  const items = getStorsgeArray(key);
  if (!items.includes(id)) {
    items.push(id);
    saveToStorage(key, items);
  }
}

//  видаляю id з зі збереженого масиву
// филтер створює новий масив без заданого id
// зберігаю новий масив у сховище
export function removeFromStorageId(key, id) {
  const items = getStorsgeArray(key).filter(item => item !== id);
  saveToStorage(key, items);
}

// перевіряє чи міститься такий id -----   так або ні
export function isInStorageId(key, id) {
  return getStorsgeArray(key).includes(id);
}

/////////////////////////////////////
