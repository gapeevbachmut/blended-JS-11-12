import"./assets/styles-BrE9sqBu.js";import{a as c,i as d}from"./assets/vendor-4yCzdkXl.js";const r=document.querySelector(".categories"),p=document.querySelector(".products"),a="https://dummyjson.com/products",g="/category-list";async function _(){const{data:t}=await c(`${a}${g}`);return t.unshift("All"),t}async function m(t=1){const{data:o}=await c(`${a}?limit=12&skip=${(t-1)*12}`);return console.log("1",o.products),o.products}async function y(t,o=1){const{data:s}=await c(`${a}/category/${t}?limit=12&skip=${(o-1)*12}`);return s.products}function $(t){if(!t.target.classList.contains("categories__btn")){console.log("not a btn");return}const o=t.target.textContent;y(o),console.log(o)}function f(t){const o=t.map(s=>`
    <li class="categories__item">
      <button class="categories__btn" type="button">${s}</button>
    </li>
    `).join("");r.insertAdjacentHTML("beforeend",o)}function b(t){const o=t.map(({id:s,thumbnail:e,title:n,brand:i,category:u,price:l})=>`
    <li class="products__item" data-id="${s}">
    <img class="products__image" src="${e}" alt="${n}"/>
    <p class="products__title">${n}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${i}</span></p>
    <p class="products__category">Category: ${u}</p>
    <p class="products__price">Price: ${l} $</p>
 </li>

    `).join("");p.insertAdjacentHTML("beforeend",o)}r.addEventListener("click",$);async function k(){try{const t=await _();console.log(t),f(t);const o=await m();b(o)}catch(t){console.log(t),d.error({title:t.message})}}k();
//# sourceMappingURL=index.js.map
