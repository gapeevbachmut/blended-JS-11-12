import"./assets/styles-BrE9sqBu.js";import{a as i,i as w}from"./assets/vendor-4yCzdkXl.js";const L=document.querySelector(".categories"),g=document.querySelector(".products"),f=document.querySelector(".not-found"),s=document.querySelector(".load-more-btn"),r=document.querySelector(".modal"),C=document.querySelector(".modal-product"),$=document.querySelector(".modal__close-btn"),M=document.querySelector(".modal__content"),d="https://dummyjson.com/products",S="/category-list";async function q(){const{data:t}=await i(`${d}${S}`);return t.unshift("All"),t}async function y(t=1){const{data:e}=await i(`${d}?limit=12&skip=${(t-1)*12}`);return e.products}async function b(t,e=1){const{data:o}=await i(`${d}/category/${t}?limit=12&skip=${(e-1)*12}`);return o.products}async function B(t){const{data:e}=await i.get(`${d}/${t}`);return console.log(e),e}function A(t){const e=t.map(o=>`
    <li class="categories__item">
      <button class="categories__btn" type="button">${o}</button>
    </li>
    `).join("");L.insertAdjacentHTML("beforeend",e)}function h(t){const e=t.map(({id:o,thumbnail:c,title:n,brand:u,category:p,price:m})=>`
    <li class="products__item" data-id="${o}">
    <img class="products__image" src="${c}" alt="${n}"/>
    <p class="products__title">${n}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand:${u}</span></p>
    <p class="products__category">Category: ${p}</p>
    <p class="products__price">Price: ${m} $</p>
 </li>

    `).join("");g.insertAdjacentHTML("beforeend",e)}function j(t){const{title:e,description:o,price:c,images:n,tags:u=["eco","new"],shipping:p="Free shipping available",returnPolicy:m="30-day return"}=t,E=`
    <img class="modal-product__img" src="${(n==null?void 0:n[0])||""}" alt="${e}" />
    <div class="modal-product__content">
      <p class="modal-product__title">${e}</p>
      <ul class="modal-product__tags">
        ${u.map(P=>`<li>${P}</li>`).join("")}
      </ul>
      <p class="modal-product__description">${o}</p>
      <p class="modal-product__shipping-information">Shipping: ${p}</p>
      <p class="modal-product__return-policy">Return Policy: ${m}</p>
      <p class="modal-product__price">Price: $${c}</p>
      <button class="modal-product__buy-btn" type="button">Buy</button>
    </div>
  `;C.innerHTML=E}function T(){r.classList.add("modal--is-open"),document.addEventListener("keydown",k),r.addEventListener("click",v),$.addEventListener("click",l)}function l(){r.classList.remove("modal--is-open"),document.removeEventListener("keydown",k),r.removeEventListener("click",v),$.removeEventListener("click",l)}function k(t){t.key==="Escape"&&l()}function v(t){M.contains(t.target)||l()}let a=1,_;async function H(t){const e=t.target;if(!t.target.classList.contains("categories__btn")){console.log("not a btn");return}const o=t.target.textContent;_=o,document.querySelectorAll(".categories__btn--active").forEach(n=>n.classList.remove("categories__btn--active")),e.classList.add("categories__btn--active"),g.innerHTML="",a=1;let c=[];try{if(o==="All"?c=await y(a):c=await b(o,a),c.length)f.classList.remove("not-found--visible");else{f.classList.add("not-found--visible"),s.classList.add("hidden");return}console.log("btn-category",c),h(c),c.length===12?s.classList.remove("hidden"):s.classList.add("hidden")}catch(n){console.log(n)}}async function I(){a+=1;try{let t=[];if(_==="All"?t=await y(a):t=await b(_,a),!t.length){s.classList.add("hidden");return}h(t),console.log("btn-load-More",t),t.length<12&&s.classList.add("hidden")}catch(t){console.error(t)}}async function x(t){const e=t.target.closest(".products__item");if(!e)return;const o=e.dataset.id;if(o)try{const c=await B(o);j(c),T()}catch(c){console.error("Error loading product",c)}}L.addEventListener("click",H);g.addEventListener("click",x);s.addEventListener("click",I);async function F(){try{const t=await q();console.log(t),A(t);const e=await y()}catch(t){console.log(t),w.error({title:t.message})}}F();
//# sourceMappingURL=index.js.map
