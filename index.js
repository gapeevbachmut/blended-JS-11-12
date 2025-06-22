import"./assets/styles-BrE9sqBu.js";import{a as s,i as a}from"./assets/vendor-4yCzdkXl.js";async function c(){const{data:t}=await s(`${n}${i}`);return t.unshift("All"),t}const n="https://dummyjson.com/products",i="/category-list",r=document.querySelector(".categories");document.querySelector(".products");function l(t){const o=t.map(e=>`
    <li class="categories__item">
      <button class="categories__btn" type="button">${e}</button>
    </li>
    `).join("");r.insertAdjacentHTML("beforeend",o)}async function u(){try{const t=await c();console.log(t),l(t)}catch(t){console.log(t),a.error({title:t.message})}}u();
//# sourceMappingURL=index.js.map
