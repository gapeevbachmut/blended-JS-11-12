import"./assets/styles-BrE9sqBu.js";import{a as n,i as m}from"./assets/vendor-4yCzdkXl.js";const l=document.querySelector(".categories"),u=document.querySelector(".products"),i=document.querySelector(".not-found"),r="https://dummyjson.com/products",y="/category-list";async function f(){const{data:t}=await n(`${r}${y}`);return t.unshift("All"),t}async function d(t=1){const{data:s}=await n(`${r}?limit=12&skip=${(t-1)*12}`);return s.products}async function b(t,s=1){const{data:o}=await n(`${r}/category/${t}?limit=12&skip=${(s-1)*12}`);return console.log(t),o.products}function $(t){const s=t.map(o=>`
    <li class="categories__item">
      <button class="categories__btn" type="button">${o}</button>
    </li>
    `).join("");l.insertAdjacentHTML("beforeend",s)}function L(t){const s=t.map(({id:o,thumbnail:e,title:c,brand:p,category:g,price:_})=>`
    <li class="products__item" data-id="${o}">
    <img class="products__image" src="${e}" alt="${c}"/>
    <p class="products__title">${c}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${p}</span></p>
    <p class="products__category">Category: ${g}</p>
    <p class="products__price">Price: ${_} $</p>
 </li>

    `).join("");u.insertAdjacentHTML("beforeend",s)}let a=1;async function k(t){if(!t.target.classList.contains("categories__btn")){console.log("not a btn");return}const s=t.target,o=t.target.textContent;document.querySelectorAll(".categories__btn--active").forEach(c=>c.classList.remove("categories__btn--active")),s.classList.add("categories__btn--active"),u.innerHTML="",a=1;let e;try{if(o==="All"?e=await d(a):e=await b(o,a),e.length)i.classList.remove("not-found--visible");else{i.classList.add("not-found--visible");return}L(e)}catch(c){console.log(c)}}l.addEventListener("click",k);async function P(){try{const t=await f();console.log(t),$(t);const s=await d()}catch(t){console.log(t),m.error({title:t.message})}}P();
//# sourceMappingURL=index.js.map
