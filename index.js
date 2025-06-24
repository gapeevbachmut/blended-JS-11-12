import"./assets/styles-BrE9sqBu.js";import{a as i,i as b}from"./assets/vendor-4yCzdkXl.js";const g=document.querySelector(".categories"),p=document.querySelector(".products"),u=document.querySelector(".not-found"),a=document.querySelector(".load-more-btn"),l="https://dummyjson.com/products",h="/category-list";async function $(){const{data:t}=await i(`${l}${h}`);return t.unshift("All"),t}async function d(t=1){const{data:e}=await i(`${l}?limit=12&skip=${(t-1)*12}`);return e.products}async function _(t,e=1){const{data:o}=await i(`${l}/category/${t}?limit=12&skip=${(e-1)*12}`);return console.log(t),o.products}function k(t){const e=t.map(o=>`
    <li class="categories__item">
      <button class="categories__btn" type="button">${o}</button>
    </li>
    `).join("");g.insertAdjacentHTML("beforeend",e)}function m(t){const e=t.map(({id:o,thumbnail:s,title:c,brand:y,category:f,price:L})=>`
    <li class="products__item" data-id="${o}">
    <img class="products__image" src="${s}" alt="${c}"/>
    <p class="products__title">${c}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${y}</span></p>
    <p class="products__category">Category: ${f}</p>
    <p class="products__price">Price: ${L} $</p>
 </li>

    `).join("");p.insertAdjacentHTML("beforeend",e)}let n=1,r;async function w(t){const e=t.target;if(!t.target.classList.contains("categories__btn")){console.log("not a btn");return}const o=t.target.textContent;r=o,document.querySelectorAll(".categories__btn--active").forEach(c=>c.classList.remove("categories__btn--active")),e.classList.add("categories__btn--active"),p.innerHTML="",n=1;let s=[];try{if(o==="All"?s=await d(n):s=await _(o,n),s.length)u.classList.remove("not-found--visible");else{u.classList.add("not-found--visible"),a.classList.add("hidden");return}console.log("btn-category",s),m(s),s.length===12?a.classList.remove("hidden"):a.classList.add("hidden")}catch(c){console.log(c)}}async function v(){n+=1;try{let t=[];if(r==="All"?t=await d(n):t=await _(r,n),!t.length){a.classList.add("hidden");return}m(t),console.log("btn-load-More",t),t.length<12&&a.classList.add("hidden")}catch(t){console.error(t)}}g.addEventListener("click",w);a.addEventListener("click",v);async function M(){try{const t=await $();console.log(t),k(t);const e=await d()}catch(t){console.log(t),b.error({title:t.message})}}M();
//# sourceMappingURL=index.js.map
