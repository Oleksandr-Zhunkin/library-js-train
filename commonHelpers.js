import{a as p,S,i as u}from"./assets/vendor-b11e2a50.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();p.defaults.baseURL="https://pixabay.com/api/";let j=1;const y=15;async function v(t,e){const r={params:{key:"44033528-44943d254def6182670dcc208",q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:e,per_page:y}};return(await p.get("",r)).data}function E({webformatURL:t,largeImageURL:e,tags:r,likes:n,views:o,comments:s,downloads:a}){return`<li class="gallery">
      <a href=${e}>
        <img src=${t} alt="${r}" />
        <div class="info">
        <div class="info-rating">
        <h3>Likes</h3>
        <p>${n}</p>
        </div>
        <div class="info-rating">
        <h3>Views</h3>
        <p>${o}</p>
        </div>
        <div class="info-rating">
        <h3>Comments</h3>
        <p>${s}</p>
        </div>
        <div class="info-rating">
        <h3>Downloads</h3>
        <p>${a}</p>
        </div>
        </div>
        </a>
    </li>`}function L(t){return t.map(E).join("")}const O="/goit-js-hw-12/assets/error-7f058cba.svg",q="/goit-js-hw-12/assets/caution-8cea4238.svg",H="/goit-js-hw-12/assets/imgok-55aec323.svg",W="/goit-js-hw-12/assets/hello-934e4862.svg",$=document.querySelector(".js-form"),h=document.querySelector(".js-gallery-list"),d=document.querySelector(".loader"),g=document.querySelector(".js-load-more"),w=document.querySelector(".js-text-load"),b=new S(".gallery a");let i=j,l=null,f=1;$.addEventListener("submit",T);g.addEventListener("click",M);document.addEventListener("DOMContentLoaded",B);async function T(t){if(t.preventDefault(),l=t.currentTarget.elements.search.value.trim(),l==="")return c(),m("Sorry, the input field cannot be empty!");x();try{i=1;const e=await v(l,i);e.hits.length===0&&(c(),m("Sorry, there are no images matching your search query. Please try again!")),e.totalHits!==0&&R(`We found ${e.totalHits} images for your request!`),h.innerHTML=L(e.hits),f=Math.ceil(e.totalHits/y),e.totalHits<15?c():C(),b.refresh()}catch(e){console.log(e)}finally{P(),t.target.reset()}}async function M(t){i+=1,d.classList.remove("visually-hidden"),c(),x();try{const e=await v(l,i);h.insertAdjacentHTML("beforeend",L(e.hits)),b.refresh(),i===f&&k("We're sorry, but you've reached the end of search results.")}catch(e){console.log(e)}finally{P(),i!==f&&C(),d.classList.add("visually-hidden"),U()}}function C(){g.classList.remove("visually-hidden")}function c(){g.classList.add("visually-hidden")}function x(){d.classList.remove("visually-hidden"),w.classList.remove("visually-hidden")}function P(){w.classList.add("visually-hidden"),d.classList.add("visually-hidden")}function m(t){u.error({title:"Error",message:t,maxWidth:360,position:"topRight",iconUrl:O,backgroundColor:"#ef4040",messageColor:"#fff"})}function R(t){u.success({title:"OK",message:t,maxWidth:360,position:"topRight",iconUrl:H,backgroundColor:"#59a10d",messageColor:"#fff"})}function k(t){u.warning({message:t,maxWidth:360,position:"topRight",iconUrl:q,backgroundColor:"#ffa000",messageColor:"#fff"})}function B(){u.info({message:"Welcome to our website",maxWidth:360,position:"topRight",iconUrl:W,backgroundColor:"#6c8cff",messageColor:"#fff"})}function U(){const t=h.firstElementChild.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
