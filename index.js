import"./assets/styles-BrE9sqBu.js";import{a as i,i as C}from"./assets/vendor-4yCzdkXl.js";const b=document.querySelector(".categories"),d=document.querySelector(".products"),a=document.querySelector(".not-found"),s=document.querySelector(".load-more-btn"),u=document.querySelector(".modal"),q=document.querySelector(".modal-product"),$=document.querySelector(".modal__close-btn"),M=document.querySelector(".modal__content"),B=document.querySelector(".search-form"),p=document.querySelector(".search-form__input"),m=document.querySelector(".search-form__btn-clear"),l="https://dummyjson.com/products",T="/category-list";async function A(){const{data:t}=await i(`${l}${T}`);return t.unshift("All"),t}async function _(t=1){const{data:e}=await i(`${l}?limit=12&skip=${(t-1)*12}`);return e.products}async function k(t,e=1){const{data:o}=await i(`${l}/category/${t}?limit=12&skip=${(e-1)*12}`);return o.products}async function j(t){const{data:e}=await i.get(`${l}/${t}`);return console.log(e),e}async function H(t,e=1){const{data:o}=await i.get(`${l}/search?q=${encodeURIComponent(t)}&limit=12&skip=${(e-1)*12}`);return o.products}function I(t){const e=t.map(o=>`
    <li class="categories__item">
      <button class="categories__btn" type="button">${o}</button>
    </li>
    `).join("");b.insertAdjacentHTML("beforeend",e)}function g(t){const e=t.map(({id:o,thumbnail:c,title:n,brand:f,category:h,price:L})=>`
    <li class="products__item" data-id="${o}">
    <img class="products__image" src="${c}" alt="${n}"/>
    <p class="products__title">${n}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${f}</span></p>
    <p class="products__category">Category: ${h}</p>
    <p class="products__price">Price: ${L} $</p>
 </li>

    `).join("");d.insertAdjacentHTML("beforeend",e)}function F(t){const{title:e,description:o,price:c,images:n,tags:f=["eco","new"],shipping:h="Free shipping available",returnPolicy:L="30-day return"}=t,w=`
    <img class="modal-product__img" src="${(n==null?void 0:n[0])||""}" alt="${e}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${e}</p>
      <ul class="modal-product__tags">
        ${f.map(P=>`<li>${P}</li>`).join("")}
      </ul>
      <p class="modal-product__description">${o}</p>
      <p class="modal-product__shipping-information">Shipping: ${h}</p>
      <p class="modal-product__return-policy">Return Policy: ${L}</p>
      <p class="modal-product__price">Price: $${c}</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>
  `;q.innerHTML=w}function R(){u.classList.add("modal--is-open"),document.addEventListener("keydown",E),u.addEventListener("click",S),$.addEventListener("click",y)}function y(){u.classList.remove("modal--is-open"),document.removeEventListener("keydown",E),u.removeEventListener("click",S),$.removeEventListener("click",y)}function E(t){t.key==="Escape"&&y()}function S(t){M.contains(t.target)||y()}let r=1,v;async function x(t){const e=t.target;if(!t.target.classList.contains("categories__btn")){console.log("not a btn");return}const o=t.target.textContent;v=o,document.querySelectorAll(".categories__btn--active").forEach(n=>n.classList.remove("categories__btn--active")),e.classList.add("categories__btn--active"),d.innerHTML="",r=1;let c=[];try{if(o==="All"?c=await _(r):c=await k(o,r),c.length)a.classList.remove("not-found--visible");else{a.classList.add("not-found--visible"),s.classList.add("hidden");return}console.log("btn-category",c),g(c),c.length===12?s.classList.remove("hidden"):s.classList.add("hidden")}catch(n){console.log(n)}}async function D(){r+=1;try{let t=[];if(v==="All"?t=await _(r):t=await k(v,r),!t.length){s.classList.add("hidden");return}g(t),console.log("btn-load-More",t),t.length<12&&s.classList.add("hidden")}catch(t){console.error(t)}}async function N(t){const e=t.target.closest(".products__item");if(!e)return;const o=e.dataset.id;if(o)try{const c=await j(o);F(c),R()}catch(c){console.error("Error loading product",c)}}async function U(t){t.preventDefault();const e=p.value.trim();if(e)try{const o=await H(e,1);d.innerHTML="",o.length?(g(o),a.classList.remove("not-found--visible"),s.classList.add("hidden")):(a.classList.add("not-found--visible"),s.classList.add("hidden"))}catch(o){console.error("Search error",o)}}async function z(){p.value="",m.classList.add("hidden");try{const t=await _(1);d.innerHTML="",t.length?(g(t),a.classList.remove("not-found--visible"),s.classList.remove("hidden")):a.classList.add("not-found--visible")}catch(t){console.error("Clear search error",t)}}b.addEventListener("click",x);d.addEventListener("click",N);s.addEventListener("click",D);B.addEventListener("submit",U);m.addEventListener("click",z);p.addEventListener("input",()=>{p.value.trim()?m.classList.remove("hidden"):m.classList.add("hidden")});async function O(){try{const t=await A();console.log(t),I(t);const e=await _()}catch(t){console.log(t),C.error({title:t.message})}}O();
//# sourceMappingURL=index.js.map
