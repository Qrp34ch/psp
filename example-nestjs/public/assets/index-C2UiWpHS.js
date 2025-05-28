(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();class v{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card">
                    <img class="card-img-top" src="${t.src}" alt="картинка">
                    <div class="card-body">
                        <h5 class="card-title">${t.title}</h5>
                        <p class="card-text">${t.text}</p>
                        <div class="buttons">
                            <button class="btn btn-primary details-btn" id="click-card-${t.id}" data-id="${t.id}">Подробнее</button>
                            <button class="btn btn-primary edit-btn" id="edit-card-${t.id}" data-id="${t.id}" style="margin-left: 10px;"">Изменить</button>
                            <button class="btn btn-primary delete-btn" id="del-card-${t.id}" data-id="${t.id}" style="margin-left: 10px;"">Удалить</button>
                        </div>
                    </div>
                </div>
            `}render(t,s,n,e){const a=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",a);const r=this.parent.lastElementChild,o=r.querySelector(".details-btn"),h=r.querySelector(".delete-btn"),u=r.querySelector(".edit-btn");o.addEventListener("click",s),h.addEventListener("click",n),u.addEventListener("click",e)}}class p{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}addListeners1(t){document.getElementById("filter-button").addEventListener("click",t)}addListeners2(t){document.getElementById("add-zap").addEventListener("click",t)}getHTML(){return`
                <header class="shapk">
                <div class="shapka-buttons">
                <button id="back-button" class="btn-home" type="button">🏠︎</button>
                <button id="filter-button" class="btn-home" type="button">☰</button>
                

                </div>
                </header>
            `}render(t){const s=this.getHTML();this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t);const n=document.getElementById("zad12"),e=document.getElementById("ogo");n&&n.addEventListener("click",()=>{new bootstrap.Toast(e).show()})}}class g{constructor(t){this.parent=t}getHTML(){return`
                <footer class="foot"></footer>
            `}render(){const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t)}}class f{constructor(t){this.parent=t}getHTML(t){return`
                <div class="card mb-3" style="width: 1200px; ">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${t.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${t.title}</h5>
                                <p class="card-text">${t.text}</p>
                                <p class="card-detali">${t.detali}</p>
                                <button id="report" class="btn btn-primary" type="button">Откликнуться</button>
                                <div class="toast-container position-fixed bottom-0 end-0 p-3">
                                <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                                    <div class="toast-header">
                                    <img src="https://eaz-ekb.ru/upload/iblock/d22/uo86s9d1zj0c6lwsro0hbjgkmd2xkemz.png" class="rounded me-2" alt="картинка" style="widght: 30px; height: 30px;">
                                    <strong class="me-auto">водоканал</strong>
                                    <small>сейчас</small>
                                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                                    </div>
                                    <div class="toast-body" style="color: black;">
                                    Ваша заявка принята <3
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(t){const s=this.getHTML(t);this.parent.insertAdjacentHTML("beforeend",s);const n=document.getElementById("report"),e=document.getElementById("liveToast");n&&n.addEventListener("click",()=>{new bootstrap.Toast(e).show()})}}class y{constructor(t){this.parent=t}addListeners(t){document.getElementById("back-button").addEventListener("click",t)}getHTML(){return`
                <button id="back-button" class="btn btn-primary" type="button">БЛИТН БИНТЕЛ</button>
            `}render(t){const s=this.getHTML();this.parent.insertAdjacentHTML("beforeend",s),this.addListeners(t)}}class I{async get(t,s=null){try{const n=await fetch(t),e=await n.json();return s!==null&&s(e,n.status),e}catch(n){console.error("Ошибка GET запроса:",n)}}async post(t,s,n=null){try{const e=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(s)}),a=await e.text();if(!a)return n&&n(null,e.status),null;const r=JSON.parse(a);return n&&n(r,e.status),r}catch(e){console.error("Ошибка POST запроса:",e)}}async patch(t,s,n=null){try{const e=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});let a=null;try{a=await e.json()}catch{a=null}return n!==null&&n(a,e.status),s}catch(e){console.error("Ошибка PATCH запроса:",e)}}async delete(t,s=null){try{const n=await fetch(t,{method:"DELETE"});let e=null;try{e=await n.json()}catch{e=null}return s!==null&&s(e,n.status),e}catch(n){console.error("Ошибка DELETE запроса:",n)}}}const c=new I;class k{constructor(){this.baseUrl="http://localhost:3000"}getStocks(){return`${this.baseUrl}/stocks`}getStockById(t){return`${this.baseUrl}/stocks/${t}`}addStock(){return`${this.baseUrl}/stocks`}removeStockById(t){return`${this.baseUrl}/stocks/${t}`}updateStockById(t){return`${this.baseUrl}/stocks/${t}`}}const l=new k;class L{constructor(t,s,n){this.parent=t,this.id=s,this.data=n}getData(t){c.get(l.getStockById(this.id),s=>{this.renderData(s),t()})}renderData(t){new f(this.pageRoot).render(t)}get pageRoot(){return document.getElementById("product-page")}getHTML(){return`
                <div id="product-page"></div>
            `}clickBack(){new d(this.parent).render()}render(){this.parent.innerHTML="";const t=this.getHTML();this.parent.insertAdjacentHTML("beforeend",t),new p(this.pageRoot).render(),new y(this.pageRoot).render(this.clickBack.bind(this)),this.getData(()=>{new g(this.pageRoot).render()})}}class w{constructor(t,s,n){this.parent=t,this.onAddCallback=s,this.existingCards=n||[]}getHTML(){return`
                <div id="main-page" class="d-flex flex-column"><div/>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Картинка</dt>
                        <dd>
                            <input type="text" class="search_pg" id="srcInput" placeholder="введите ссылку на картинку...">
                        </dd>
                    </dl>
                </div>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Название профессии</dt>
                        <dd>
                            <input type="text" class="search_pg" id="titleInput" placeholder="Введите название вакансии...">
                        </dd>
                    </dl>
                </div>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Зарплата</dt>
                        <dd>
                            <input type="text" class="search_pg" id="zpInput" placeholder="Введите зарплату...">
                        </dd>
                    </dl>
                </div>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Описание</dt>
                        <dd>
                            <input type="text" class="search_pg" id="detaliInput" placeholder="Введите описание...">
                        </dd>
                    </dl>
                    
                </div>
                <div class="toast-container position-fixed bottom-0 end-0 p-3">
                    <div id="ogo" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <img src="https://eaz-ekb.ru/upload/iblock/d22/uo86s9d1zj0c6lwsro0hbjgkmd2xkemz.png" class="rounded me-2" alt="картинка" style="widght: 30px; height: 30px;">
                            <strong class="me-auto">водоканал</strong>
                            <small>сейчас</small>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                        </div>
                        <div class="toast-body" style="color: black;">Вакансия добавлена <3</div>
                    </div>
                </div>
                
                <button id="add-zap" class="btn-add" type="button">добавить</button>
                
            `}clickBack(){new d(this.parent).render()}async handleAddVacancy(){var o,h,u,m;const t=(o=document.getElementById("srcInput"))==null?void 0:o.value.trim(),s=(h=document.getElementById("titleInput"))==null?void 0:h.value.trim(),n=parseInt((u=document.getElementById("zpInput"))==null?void 0:u.value),e=(m=document.getElementById("detaliInput"))==null?void 0:m.value.trim();if(!t||!s||isNaN(n)||!e){alert("Пожалуйста, заполните все поля корректно!");return}const a=new Intl.NumberFormat("ru-RU").format(n),r={id:this.generateId(),src:t,title:s,zp:n,text:`от ${a} ₽ на руки`,detali:e,code:this.generateId()};try{await c.post(l.addStock(),r),this.showSuccessNotification(),await this.returnToMainPage()}catch(b){console.error("Ошибка:",b),alert(`Ошибка сохранения: ${b.message}`)}}async returnToMainPage(){try{const t=new d(this.parent);for(;this.parent.firstChild;)this.parent.removeChild(this.parent.firstChild);await t.render()}catch(t){console.error("Ошибка возврата на главную:",t),location.reload()}}generateId(){let t=1;return this.existingCards.forEach(s=>{const n=parseInt(s==null?void 0:s.id);!isNaN(n)&&n>t&&(t=n)}),console.log(t+1),t+1}showSuccessNotification(){alert("Вакансия успешно добавлена!")}render(){this.parent.innerHTML="",new p(this.parent).render(this.clickBack.bind(this));const s=this.getHTML();this.parent.insertAdjacentHTML("beforeend",s),document.getElementById("add-zap").addEventListener("click",()=>{this.handleAddVacancy()}),new g(this.parent).render()}}class x{constructor(t,s,n,e){this.parent=t,this.onAddCallback=s,this.data=e||[],this.ID=n}getHTML(){const t=this.data.filter(s=>s.id===this.ID);return`
                <div id="main-page" class="d-flex flex-column"><div/>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Картинка</dt>
                        <dd>
                            <input type="text" class="search_pg" id="srcInput" placeholder="${t[0].src}">
                        </dd>
                    </dl>
                </div>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Название профессии</dt>
                        <dd>
                            <input type="text" class="search_pg" id="titleInput" placeholder="${t[0].title}">
                        </dd>
                    </dl>
                </div>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Зарплата</dt>
                        <dd>
                            <input type="text" class="search_pg" id="zpInput" placeholder="${t[0].zp}">
                        </dd>
                    </dl>
                </div>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Описание</dt>
                        <dd>
                            <input type="text" class="search_pg" id="detaliInput" placeholder="${t[0].detali}">
                        </dd>
                    </dl>
                    
                </div>
                <div class="toast-container position-fixed bottom-0 end-0 p-3">
                    <div id="ogo" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                        <div class="toast-header">
                            <img src="https://eaz-ekb.ru/upload/iblock/d22/uo86s9d1zj0c6lwsro0hbjgkmd2xkemz.png" class="rounded me-2" alt="картинка" style="widght: 30px; height: 30px;">
                            <strong class="me-auto">водоканал</strong>
                            <small>сейчас</small>
                            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                        </div>
                        <div class="toast-body" style="color: black;">Вакансия добавлена <3</div>
                    </div>
                </div>
                
                <button id="add-zap" class="btn-add" type="button">изменить</button>
                
            `}clickBack(){new d(this.parent).render()}handleAddVacancy(){const t=document.getElementById("srcInput").value.trim(),s=document.getElementById("titleInput").value.trim(),n=parseInt(document.getElementById("zpInput").value),e=document.getElementById("detaliInput").value.trim();if(!t||!s||isNaN(n)||!e){alert("Пожалуйста, заполните все поля корректно!");return}const a=new Intl.NumberFormat("ru-RU").format(n),r={id:this.ID,src:t,title:s,zp:n,text:`от ${a} ₽ на руки`,detali:e,code:this.ID};c.patch(l.updateStockById(this.ID),r,o=>{console.log("Вакансия изменена:",o),this.showSuccessNotification(),this.onAddCallback&&this.onAddCallback(r),this.parent.innerHTML="",new d(this.parent).render()}),this.parent.innerHTML="",new d(this.parent).render()}showSuccessNotification(){alert("Вакансия успешно изменена!")}render(){this.parent.innerHTML="",new p(this.parent).render(this.clickBack.bind(this));const s=this.getHTML();this.parent.insertAdjacentHTML("beforeend",s),document.getElementById("add-zap").addEventListener("click",()=>{this.handleAddVacancy()}),new g(this.parent).render()}}class d{constructor(t){this.parent=t,this.container=null,this.data=[]}getData(){return new Promise((t,s)=>{c.get(l.getStocks(),n=>{if(!n||!Array.isArray(n)){console.error("Получены некорректные данные:",n),s(new Error("Invalid data format"));return}this.data=n,t(n)},n=>{console.error("Ошибка загрузки данных:",n),s(n)})})}async renderData(t){if(!this.container&&(this.container=this.pageRoot.querySelector(".cards-container"),!this.container)){console.error("Контейнер карточек не найден!");return}if(this.container.innerHTML="",!t||!Array.isArray(t)){console.error("Некорректные данные для рендера:",t);return}t.forEach(s=>{new v(this.container).render(s,e=>this.clickCard(e),e=>this.clickDEL(e),e=>this.clickEDIT(e))})}get pageRoot(){return document.getElementById("main-page")}getHTML(t,s,n,e,a){return`
                <div id="main-page" class="d-flex flex-column"><div/>
                <div class="zadania"> 
                    <button id="add-zap" class="btn-home1" type="button">добавить вакансию</button>
                    <button id="zad12" class="btn-home1" type="button">ДЗ</button>
                    <input type="text" class="search_pg" id="searchInput" placeholder="Введите текст для пока...">
                    <div class="toast-container position-fixed bottom-0 end-0 p-3">
                        <div id="ogo" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                            <div class="toast-header">
                                <img src="https://eaz-ekb.ru/upload/iblock/d22/uo86s9d1zj0c6lwsro0hbjgkmd2xkemz.png" class="rounded me-2" alt="картинка" style="widght: 30px; height: 30px;">
                                <strong class="me-auto">Задания</strong>
                                <small>сейчас</small>
                                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Закрыть"></button>
                            </div>
                            <div class="toast-body" style="color: black;">
                                <div>Количество повторяющихся записей = ${t}</div>
                                <div>Среднее арифметическое зарплат = ${s}</div>
                                <div>Диапазоны ID записей: ${n}</div>
                                <div>"Привет" - палиндром: ${e}</div>
                                <div>"Приветтевирп" - палиндром: ${a}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cards-container"></div>
                
            `}FoundIndex(t){for(let s=0;s<=this.data.length;s++)if(this.data[s].id==t)return s;return-1}clickCard(t){const s=t.target.dataset.id,n=this.data.find(e=>e.id==s);n?new L(this.parent,s,n).render():console.error("Вакансия не найдена")}clickADD(){new w(this.parent,s=>{this.data.push(s),console.log("Данные после добавления:",this.data);const n=this.pageRoot.querySelector(".cards-container");n.innerHTML="",this.renderData(this.data,n)},this.data).render(),console.log("Данные после добавления:",this.data)}clickEDIT(t){new x(this.parent,n=>{this.data=this.data.filter(a=>a.id!==n.id),this.data.push(n),console.log("Данные после добавления:",this.data);const e=this.pageRoot.querySelector(".cards-container");e.innerHTML="",this.renderData(this.data,e)},parseInt(t.target.dataset.id),this.data).render(),console.log("Данные после добавления:",this.data)}clickDEL(t){const s=parseInt(t.target.dataset.id);if(isNaN(s))return;this.data=this.data.filter(e=>e.id!==s),c.delete(l.removeStockById(s),()=>{console.log("Удалено с сервера")});const n=this.pageRoot.querySelector(".cards-container");n&&this.renderData(this.data,n)}countIdentic(){let t=0,s,n=[],e={};for(let a=0;a<this.data.length;a++)n.push(this.data[a].code);for(let a=0;a<n.length;a++)s=n[a],e[s]?e[s]++:e[s]=1;for(let a in e)e[a]>1&&(t+=e[a]);return t}srZnach(){let t=0;if(this.data.length>0){for(let s=0;s<this.data.length;s++)t+=this.data[s].zp;return t/this.data.length}else return 0}diapazon(){let t=[];if(this.data.length>0){for(let e=0;e<this.data.length;e++)t.push(this.data[e].id);t.sort((e,a)=>e-a);let s=t[0],n;for(let e=1;e<t.length;e++)t[e-1]+1===t[e]?n=!0:n?(s+="-"+t[e-1]+","+t[e],n=!1):s+=","+t[e];return n&&(s+="-"+t[t.length-1]),s}else return 0}palindrome1(t){let s=t.toLowerCase(),n=s.length-1;for(let e=0;e<n/2;e++){let a=s[e],r=s[n-e];if(a!=r)return"нет"}return"да"}palindrome2(t){let s=t.toLowerCase(),n="";for(let e=s.length-1;e>=0;e--)n+=s[e];return n===s?"да":"нет"}foundFilter(){const s=document.getElementById("searchInput").value.toLowerCase();console.log(s),c.get(l.getStocks(),n=>{const e=n.filter(r=>r.title.toLowerCase().includes(s));this.pageRoot.querySelector(".cards-container").innerHTML="";const a=this.pageRoot.querySelector(".cards-container");this.renderData(e,a)})}async render(){this.parent.innerHTML="";const t=this.getHTML(this.countIdentic(),this.srZnach(),this.diapazon(),this.palindrome1("Привет"),this.palindrome2("Приветтевирп"));this.parent.insertAdjacentHTML("beforeend",t),new p(this.pageRoot).render(this.clickCard.bind(this));const n=await this.getData();await this.renderData(n),document.getElementById("add-zap").addEventListener("click",this.clickADD.bind(this)),document.getElementById("searchInput").addEventListener("input",this.foundFilter.bind(this)),new g(this.pageRoot).render()}}const T=document.getElementById("root"),E=new d(T);E.render();
