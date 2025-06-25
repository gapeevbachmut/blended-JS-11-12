import"./assets/styles-BrE9sqBu.js";import{a as d,i as B}from"./assets/vendor-4yCzdkXl.js";const k=document.querySelector(".categories"),l=document.querySelector(".products"),a=document.querySelector(".not-found"),n=document.querySelector(".load-more-btn"),m=document.querySelector(".modal"),T=document.querySelector(".modal-product"),C=document.querySelector(".modal__close-btn"),A=document.querySelector(".modal__content"),N=document.querySelector(".search-form"),p=document.querySelector(".search-form__input"),g=document.querySelector(".search-form__btn-clear"),u="https://dummyjson.com/products",j="/category-list";async function H(){const{data:t}=await d(`${u}${j}`);return t.unshift("All"),t}async function f(t=1){const{data:e}=await d(`${u}?limit=12&skip=${(t-1)*12}`);return e.products}async function S(t,e=1){const{data:o}=await d(`${u}/category/${t}?limit=12&skip=${(e-1)*12}`);return o.products}async function R(t){const{data:e}=await d.get(`${u}/${t}`);return console.log(e),e}async function x(t,e=1){const{data:o}=await d.get(`${u}/search?q=${encodeURIComponent(t)}&limit=12&skip=${(e-1)*12}`);return o.products}const $="cart";function b(){const t=localStorage.getItem($);return t?JSON.parse(t):[]}function F(t){const e=b();e.includes(t)||(e.push(t),localStorage.setItem($,JSON.stringify(e)))}function O(t){const e=b().filter(o=>o!==t);localStorage.setItem($,JSON.stringify(e))}function E(t){return b().includes(t)}function J(t){const e=t.map(o=>`
    <li class="categories__item">
      <button class="categories__btn" type="button">${o}</button>
    </li>
    `).join("");k.insertAdjacentHTML("beforeend",e)}function _(t){const e=t.map(({id:o,thumbnail:c,title:r,brand:i,category:h,price:L})=>`
    <li class="products__item" data-id="${o}">
    <img class="products__image" src="${c}" alt="${r}"/>
    <p class="products__title">${r}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${i}</span></p>
    <p class="products__category">Category: ${h}</p>
    <p class="products__price">Price: ${L} $</p>
 </li>

    `).join("");l.insertAdjacentHTML("beforeend",e)}function D(t){const{id:e,title:o,description:c,price:r,images:i,tags:h=["eco","new"],shipping:L="Free shipping available",returnPolicy:q="30-day return"}=t;E(e);const M=`
  <div class="modal-product" data-id="${e}">
    <img class="modal-product__img" src="${(i==null?void 0:i[0])||""}" alt="${o}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${o}</p>
      <ul class="modal-product__tags">
        ${h.map(I=>`<li>${I}</li>`).join("")}
      </ul>
      <p class="modal-product__description">${c}</p>
      <p class="modal-product__shipping-information">Shipping: ${L}</p>
      <p class="modal-product__return-policy">Return Policy: ${q}</p>
      <p class="modal-product__price">Price: $${r}</p>
      
      
    </div>
  </div>
  `;T.innerHTML=M}function U(){m.classList.add("modal--is-open"),document.addEventListener("keydown",w),m.addEventListener("click",P),C.addEventListener("click",y)}function y(){m.classList.remove("modal--is-open"),document.removeEventListener("keydown",w),m.removeEventListener("click",P),C.removeEventListener("click",y)}function w(t){t.key==="Escape"&&y()}function P(t){A.contains(t.target)||y()}let s=1,v;async function z(t){const e=t.target;if(!t.target.classList.contains("categories__btn")){console.log("not a btn");return}const o=t.target.textContent;v=o,document.querySelectorAll(".categories__btn--active").forEach(r=>r.classList.remove("categories__btn--active")),e.classList.add("categories__btn--active"),l.innerHTML="",s=1;let c=[];try{if(o==="All"?c=await f(s):c=await S(o,s),c.length)a.classList.remove("not-found--visible");else{a.classList.add("not-found--visible"),n.classList.add("hidden");return}console.log("btn-category",c),_(c),c.length===12?n.classList.remove("hidden"):n.classList.add("hidden")}catch(r){console.log(r)}}async function K(){s+=1;try{let t=[];if(v==="All"?t=await f(s):t=await S(v,s),!t.length){n.classList.add("hidden");return}_(t),console.log("btn-load-More",t),t.length<12&&n.classList.add("hidden")}catch(t){console.error(t)}}async function Y(t){const e=t.target.closest(".products__item");if(!e)return;const o=e.dataset.id;if(o)try{const c=await R(o);D(c),U()}catch(c){console.error("Error loading product",c)}}async function G(t){t.preventDefault();const e=p.value.trim();if(e)try{const o=await x(e,1);l.innerHTML="",o.length?(_(o),a.classList.remove("not-found--visible"),n.classList.add("hidden")):(a.classList.add("not-found--visible"),n.classList.add("hidden"))}catch(o){console.error("Search error",o)}}async function Q(){p.value="",g.classList.add("hidden");try{const t=await f(1);l.innerHTML="",t.length?(_(t),a.classList.remove("not-found--visible"),n.classList.remove("hidden")):a.classList.add("not-found--visible")}catch(t){console.error("Clear search error",t)}}function V(t){const e=t.target,o=e.closest(".modal-product").dataset.id;if(!o)return;const c=Number(o);E(c)?(O(c),e.textContent="Add to Cart"):(F(c),e.textContent="Remove from Cart")}k.addEventListener("click",z);l.addEventListener("click",Y);n.addEventListener("click",K);N.addEventListener("submit",G);g.addEventListener("click",Q);p.addEventListener("input",()=>{p.value.trim()?g.classList.remove("hidden"):g.classList.add("hidden")});document.addEventListener("click",t=>{t.target.classList.contains("modal-product__btn--cart")&&V(t)});async function W(){try{const t=await H();console.log(t),J(t);const e=await f()}catch(t){console.log(t),B.error({title:t.message})}}W();
//# sourceMappingURL=index.js.map
