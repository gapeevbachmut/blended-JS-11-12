import"./assets/styles-BrE9sqBu.js";import{a as d,i as T}from"./assets/vendor-4yCzdkXl.js";const C=document.querySelector(".categories"),l=document.querySelector(".products"),a=document.querySelector(".not-found"),n=document.querySelector(".load-more-btn"),m=document.querySelector(".modal"),A=document.querySelector(".modal-product"),k=document.querySelector(".modal__close-btn"),j=document.querySelector(".modal__content"),H=document.querySelector(".search-form"),p=document.querySelector(".search-form__input"),g=document.querySelector(".search-form__btn-clear"),N=document.querySelector("[data-cart-count]"),u="https://dummyjson.com/products",x="/category-list";async function R(){const{data:t}=await d(`${u}${x}`);return t.unshift("All"),t}async function f(t=1){const{data:e}=await d(`${u}?limit=12&skip=${(t-1)*12}`);return e.products}async function S(t,e=1){const{data:o}=await d(`${u}/category/${t}?limit=12&skip=${(e-1)*12}`);return o.products}async function F(t){const{data:e}=await d.get(`${u}/${t}`);return console.log(e),e}async function O(t,e=1){const{data:o}=await d.get(`${u}/search?q=${encodeURIComponent(t)}&limit=12&skip=${(e-1)*12}`);return o.products}const b="cart";function _(){const t=localStorage.getItem(b);return t?JSON.parse(t):[]}function J(t){const e=_();e.includes(t)||(e.push(t),localStorage.setItem(b,JSON.stringify(e)))}function D(t){const e=_().filter(o=>o!==t);localStorage.setItem(b,JSON.stringify(e))}function E(t){return _().includes(t)}function w(){const t=_();N.textContent=t.length}function U(t){const e=t.map(o=>`
    <li class="categories__item">
      <button class="categories__btn" type="button">${o}</button>
    </li>
    `).join("");C.insertAdjacentHTML("beforeend",e)}function y(t){const e=t.map(({id:o,thumbnail:c,title:r,brand:i,category:L,price:v})=>`
    <li class="products__item" data-id="${o}">
    <img class="products__image" src="${c}" alt="${r}"/>
    <p class="products__title">${r}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${i}</span></p>
    <p class="products__category">Category: ${L}</p>
    <p class="products__price">Price: ${v} $</p>
 </li>

    `).join("");l.insertAdjacentHTML("beforeend",e)}function z(t){const{id:e,title:o,description:c,price:r,images:i,tags:L=["eco","new"],shipping:v="Free shipping available",returnPolicy:M="30-day return"}=t;E(e);const I=`
  <div class="modal-product" data-id="${e}">
    <img class="modal-product__img" src="${(i==null?void 0:i[0])||""}" alt="${o}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${o}</p>
      <ul class="modal-product__tags">
        ${L.map(B=>`<li>${B}</li>`).join("")}
      </ul>
      <p class="modal-product__description">${c}</p>
      <p class="modal-product__shipping-information">Shipping: ${v}</p>
      <p class="modal-product__return-policy">Return Policy: ${M}</p>
      <p class="modal-product__price">Price: $${r}</p>
      
      
    </div>
  </div>
  `;A.innerHTML=I}function K(){m.classList.add("modal--is-open"),document.addEventListener("keydown",P),m.addEventListener("click",q),k.addEventListener("click",h)}function h(){m.classList.remove("modal--is-open"),document.removeEventListener("keydown",P),m.removeEventListener("click",q),k.removeEventListener("click",h)}function P(t){t.key==="Escape"&&h()}function q(t){j.contains(t.target)||h()}let s=1,$;async function Y(t){const e=t.target;if(!t.target.classList.contains("categories__btn")){console.log("not a btn");return}const o=t.target.textContent;$=o,document.querySelectorAll(".categories__btn--active").forEach(r=>r.classList.remove("categories__btn--active")),e.classList.add("categories__btn--active"),l.innerHTML="",s=1;let c=[];try{if(o==="All"?c=await f(s):c=await S(o,s),c.length)a.classList.remove("not-found--visible");else{a.classList.add("not-found--visible"),n.classList.add("hidden");return}console.log("btn-category",c),y(c),c.length===12?n.classList.remove("hidden"):n.classList.add("hidden")}catch(r){console.log(r)}}async function G(){s+=1;try{let t=[];if($==="All"?t=await f(s):t=await S($,s),!t.length){n.classList.add("hidden");return}y(t),console.log("btn-load-More",t),t.length<12&&n.classList.add("hidden")}catch(t){console.error(t)}}async function Q(t){const e=t.target.closest(".products__item");if(!e)return;const o=e.dataset.id;if(o)try{const c=await F(o);z(c),K()}catch(c){console.error("Error loading product",c)}}async function V(t){t.preventDefault();const e=p.value.trim();if(e)try{const o=await O(e,1);l.innerHTML="",o.length?(y(o),a.classList.remove("not-found--visible"),n.classList.add("hidden")):(a.classList.add("not-found--visible"),n.classList.add("hidden"))}catch(o){console.error("Search error",o)}}async function W(){p.value="",g.classList.add("hidden");try{const t=await f(1);l.innerHTML="",t.length?(y(t),a.classList.remove("not-found--visible"),n.classList.remove("hidden")):a.classList.add("not-found--visible")}catch(t){console.error("Clear search error",t)}}function X(t){const e=t.target,o=Number(e.closest(".modal-product").dataset.id);o&&(E(o)?(D(o),e.textContent="Add to Cart"):(J(o),e.textContent="Remove from Cart"),w())}w();C.addEventListener("click",Y);l.addEventListener("click",Q);n.addEventListener("click",G);H.addEventListener("submit",V);g.addEventListener("click",W);p.addEventListener("input",()=>{p.value.trim()?g.classList.remove("hidden"):g.classList.add("hidden")});document.addEventListener("click",t=>{t.target.classList.contains("modal-product__btn--cart")&&X(t)});async function Z(){try{const t=await R();console.log(t),U(t);const e=await f()}catch(t){console.log(t),T.error({title:t.message})}}Z();
//# sourceMappingURL=index.js.map
