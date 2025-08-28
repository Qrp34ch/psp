import {ProductCardComponent} from "../../components/product-card/index.js";
import {Shapk} from "../../components/shapk/index.js";
import {Foot} from "../../components/foot/index.js";
import {MainPage} from "../main/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {ProductPage} from "../product/index.js";

import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class NewJobPage {
    constructor(parent, onAddCallback, existingCards) {
        this.parent = parent;
        this.onAddCallback = onAddCallback;
        this.existingCards = existingCards || [];
    }
            
    getHTML() {
        return (
            `
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
                
            `
        )
    }
    clickBack() {
        // this.parent.innerHTML = ''
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
     
    handleAddVacancy() {
        // Получаем данные из формы
        const src = document.getElementById('srcInput').value.trim();
        const title = document.getElementById('titleInput').value.trim();
        const zp = parseInt(document.getElementById('zpInput').value);
        const detali = document.getElementById('detaliInput').value.trim();
        
        // Валидация
        if (!src || !title || isNaN(zp) || !detali) {
            alert('Пожалуйста, заполните все поля корректно!');
            return;
        }
        
        // Форматируем зарплату (5 000 ₽)
        const formattedZp = new Intl.NumberFormat('ru-RU').format(zp);
        
        // Создаем объект вакансии
        const newVacancy = {
            id: this.generateId(),
            src: src,
            title: title,
            zp: zp,
            text: `от ${formattedZp} ₽ на руки`,
            detali: detali,
            code: this.generateId() // code = id
        };
        
        // Отправляем на сервер (пример через AJAX)
        ajax.post(stockUrls.addStock(), newVacancy, (response) => {
            console.log('Вакансия добавлена:', response);
            
            // Показываем уведомление
            this.showSuccessNotification();
            
            // Обновляем список и возвращаемся
            if (this.onAddCallback) {
                this.onAddCallback(newVacancy);
            }
            
            // Возврат на главную
            this.parent.innerHTML = '';
            new MainPage(this.parent).render();
            // const mainPage = new MainPage(this.parent);
            // mainPage.render();
        });
        // if (this.onAddCallback) {
        //     this.onAddCallback(newVacancy);
        // }
        
        // Закрываем страницу добавления
        this.parent.innerHTML = '';
        new MainPage(this.parent).render();
    }

    generateId() {
        let maxId = 1;
    
        // Безопасный перебор карточек
        this.existingCards.forEach(card => {
            const currentId = parseInt(card?.id);
            if (!isNaN(currentId) && currentId > maxId) {
                maxId = currentId;
            }
        });
        console.log(maxId + 1)
        
        return maxId + 1;
    }
    
    showSuccessNotification() {
        // Можно реализовать красивое уведомление
        alert('Вакансия успешно добавлена!');
    }

    render() {
        this.parent.innerHTML = ''

        const shap = new Shapk(this.parent)
        shap.render(this.clickBack.bind(this))

        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        
        document.getElementById('add-zap').addEventListener('click', () => {
            this.handleAddVacancy();
        });
        const foo = new Foot(this.parent)
        foo.render()
    }
}
