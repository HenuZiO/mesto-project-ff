(()=>{"use strict";var e="".concat("https://mesto.nomoreparties.co/v1/").concat("wff-cohort-35"),t={authorization:"77c56277-51e8-4458-ab64-19fe10c2087a","Content-Type":"application/json"};function n(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var r=document.querySelector("#card-template").content;function o(e,t,n,o,a){var c=r.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__image"),i=c.querySelector(".card__title"),l=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button"),d=c.querySelector(".card__like-counter");return c.dataset.cardId=e._id,u.src=e.link,u.alt=e.name,i.textContent=e.name,d.textContent=e.likes.length,e.likes.some((function(e){return e._id===o}))&&s.classList.add("card__like-button_is-active"),e.owner&&e.owner._id===o?(l.style.display="block",l.addEventListener("click",(function(){a(e._id)}))):l.style.display="none",s.addEventListener("click",(function(){t(s,e._id)})),u.addEventListener("click",(function(){n(e.name,e.link)})),c}function a(r,o){(function(r,o){var a=o?"DELETE":"PUT";return fetch("".concat(e,"/cards/likes/").concat(r),{method:a,headers:t}).then(n)})(o,r.classList.contains("card__like-button_is-active")).then((function(e){r.classList.toggle("card__like-button_is-active"),r.closest(".card__like-container").querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){return console.error("Ошибка при обновлении лайка:",e)}))}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i)}function u(e){var t=e.querySelector(".popup__form");e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),t&&t.reset()}function i(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&u(t)}}function l(e){var t=e.target.closest(".popup");(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&u(t)}function s(e,t){var n=e.querySelector(".popup__button");n.textContent=t,n.disabled=!0}function d(e,t){var n=e.querySelector(".popup__button");n.textContent=t,n.disabled=!1}function p(e,t,n){var r=e.querySelector(".".concat(t.name,"-input-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function f(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function _(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){p(e,n,t)})),f(n,r,t)}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var y,v={_id:"",name:"",about:"",avatar:""},S=document.querySelector(".profile__title"),h=document.querySelector(".profile__description"),b=document.querySelector(".profile__image"),q=document.querySelector(".profile__edit-button"),E=document.querySelector(".profile__add-button"),L=document.querySelector(".places__list"),g=document.querySelectorAll(".popup"),k=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_edit-avatar"),A=document.querySelector(".popup_type_new-card"),x=document.querySelector(".popup_type_image"),w=document.querySelector(".popup_type_confirm-delete"),I=document.querySelector('form[name="edit-profile"]'),T=I.querySelector(".popup__input_type_name"),j=I.querySelector(".popup__input_type_description"),O=document.querySelector('form[name="edit-avatar"]'),B=O.querySelector(".popup__input_type_url"),D=document.querySelector('form[name="new-place"]'),P=D.querySelector(".popup__input_type_card-name"),M=D.querySelector(".popup__input_type_url"),N=x.querySelector(".popup__image"),J=x.querySelector(".popup__caption"),H=w.querySelector('form[name="confirm-delete"]'),U={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__input_error-active"};function V(e,t){N.src=t,N.alt=e,J.textContent=e,c(x)}function z(e){w.dataset.cardId=e,c(w)}q.addEventListener("click",(function(){T.value=v.name,j.value=v.about,_(I,U),c(k)})),E.addEventListener("click",(function(){_(D,U),c(A)})),b.addEventListener("click",(function(){_(O,U),c(C)})),I.addEventListener("submit",(function(r){var o,a;r.preventDefault(),s(I,"Сохранение..."),(o=T.value,a=j.value,fetch("".concat(e,"/users/me"),{method:"PATCH",headers:t,body:JSON.stringify({name:o,about:a})}).then(n)).then((function(e){v.name=e.name,v.about=e.about,S.textContent=v.name,h.textContent=v.about,u(k)})).catch((function(e){return console.error("Ошибка при обновлении профиля:",e)})).finally((function(){return d(I,"Сохранить")}))})),D.addEventListener("submit",(function(r){var c,i;r.preventDefault(),s(D,"Создание..."),(c=P.value,i=M.value,fetch("".concat(e,"/cards"),{method:"POST",headers:t,body:JSON.stringify({name:c,link:i})}).then(n)).then((function(e){var t=o(e,a,V,v._id,z);L.prepend(t),r.target.reset(),_(r.target,U),u(A)})).catch((function(e){return console.error("Ошибка при создании карточки:",e)})).finally((function(){return d(D,"Создать")}))})),O.addEventListener("submit",(function(r){var o;r.preventDefault(),s(O,"Сохранение..."),(o=B.value,fetch("".concat(e,"/users/me/avatar"),{method:"PATCH",headers:t,body:JSON.stringify({avatar:o})}).then(n)).then((function(e){v.avatar=e.avatar,b.style.backgroundImage="url(".concat(v.avatar,")"),u(C)})).catch((function(e){return console.error("Ошибка при обновлении аватара:",e)})).finally((function(){return d(O,"Сохранить")}))})),H.addEventListener("submit",(function(r){r.preventDefault(),s(H,"Удаление...");var o=w.dataset.cardId,a=document.querySelector('.card[data-card-id="'.concat(o,'"]'));(function(r){return fetch("".concat(e,"/cards/").concat(r),{method:"DELETE",headers:t}).then(n)})(o).then((function(){a.remove(),u(w)})).catch((function(e){return console.error("Ошибка при удалении карточки:",e)})).finally((function(){return d(H,"Да")}))})),g.forEach((function(e){e.classList.add("popup_is-animated"),e.addEventListener("mousedown",l)})),y=U,Array.from(document.querySelectorAll(y.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);f(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"-input-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),f(n,r,t)}))}))}(e,y)})),Promise.all([fetch("".concat(e,"/users/me"),{headers:t}).then(n),fetch("".concat(e,"/cards"),{headers:t}).then(n)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,a,c,u=[],i=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=a.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return m(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?m(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=r[0],u=r[1];v._id=c._id,v.name=c.name,v.about=c.about,v.avatar=c.avatar,S.textContent=v.name,h.textContent=v.about,b.style.backgroundImage="url(".concat(v.avatar,")"),u.forEach((function(e){var t=o(e,a,V,v._id,z);L.append(t)}))})).catch((function(e){return console.error("Error loading data:",e)}))})();