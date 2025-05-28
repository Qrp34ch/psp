import {Shapk} from "../../components/shapk/index.js";
import {Foot} from "../../components/foot/index.js";
import {MainPage} from "../main/index.js";

import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class EditJobPage {
    constructor(parent, onAddCallback, IdCard, data) {
        this.parent = parent;
        this.onAddCallback = onAddCallback;
        this.data = data || [];
        this.ID = IdCard;
    }
            
    getHTML() {
        const editOne = this.data.filter(item => item.id === this.ID)
        return (
            `
                <div id="main-page" class="d-flex flex-column"><div/>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Картинка</dt>
                        <dd>
                            <input type="text" class="search_pg" id="srcInput" placeholder="${editOne[0].src}">
                        </dd>
                    </dl>
                </div>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Название профессии</dt>
                        <dd>
                            <input type="text" class="search_pg" id="titleInput" placeholder="${editOne[0].title}">
                        </dd>
                    </dl>
                </div>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Зарплата</dt>
                        <dd>
                            <input type="text" class="search_pg" id="zpInput" placeholder="${editOne[0].zp}">
                        </dd>
                    </dl>
                </div>
                <div class="Inp">
                    <dl class="text">
                        <dt class="opis">Описание</dt>
                        <dd>
                            <input type="text" class="search_pg" id="detaliInput" placeholder="${editOne[0].detali}">
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
            id: this.ID,
            src: src,
            title: title,
            zp: zp,
            text: `от ${formattedZp} ₽ на руки`,
            detali: detali,
            code: this.ID // code = id
        };
        
        ajax.patch(stockUrls.updateStockById(this.ID), newVacancy, (response) => {
            console.log('Вакансия изменена:', response);
            
            this.showSuccessNotification();
            
            if (this.onAddCallback) {
                this.onAddCallback(newVacancy);
            }
            
            this.parent.innerHTML = '';
            new MainPage(this.parent).render();
        });
        
        this.parent.innerHTML = '';
        new MainPage(this.parent).render();
    }
    
    showSuccessNotification() {
        alert('Вакансия успешно изменена!');
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
