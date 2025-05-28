// import {ButtonComponent} from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";
import {Shapk} from "../../components/shapk/index.js";
import {Foot} from "../../components/foot/index.js";
import {ProductPage} from "../product/index.js";
import {NewJobPage} from "../newjob/index.js"
import {EditJobPage} from "../editJob/index.js"

import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.container = null;
        this.data = [];
    }

    getData() {
        return new Promise((resolve, reject) => {
            ajax.get(stockUrls.getStocks(), 
                (data) => {
                    if (!data || !Array.isArray(data)) {
                        console.error('Получены некорректные данные:', data);
                        reject(new Error('Invalid data format'));
                        return;
                    }
                    this.data = data;
                    resolve(data);
                },
                (error) => {
                    console.error('Ошибка загрузки данных:', error);
                    reject(error);
                }
            );
        });
    }

    async renderData(items) {
        if (!this.container) {
            this.container = this.pageRoot.querySelector('.cards-container');
            if (!this.container) {
                console.error('Контейнер карточек не найден!');
                return;
            }
        }
        
        this.container.innerHTML = '';
        
        if (!items || !Array.isArray(items)) {
            console.error('Некорректные данные для рендера:', items);
            return;
        }
        
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.container);
            productCard.render(
                item,
                (e) => this.clickCard(e),
                (e) => this.clickDEL(e),
                (e) => this.clickEDIT(e)
            );
        });
    }
    // изменения конец

    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML(m12, m18, m22, m381, m382) {
        return (
            `
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
                                <div>Количество повторяющихся записей = ${m12}</div>
                                <div>Среднее арифметическое зарплат = ${m18}</div>
                                <div>Диапазоны ID записей: ${m22}</div>
                                <div>"Привет" - палиндром: ${m381}</div>
                                <div>"Приветтевирп" - палиндром: ${m382}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cards-container"></div>
                
            `
        )
    }

   
    FoundIndex(x){
        for (let i = 0; i <= this.data.length; i++){
            if (this.data[i].id == x){
                return i
            }
        }
        return -1;
    }

    clickCard(e) {
        // Получаем ID из data-атрибута кнопки
        const cardId = e.target.dataset.id;
        
        // Находим соответствующую вакансию
        const vacancy = this.data.find(item => item.id == cardId);
        
        if (vacancy) {
            const productPage = new ProductPage(this.parent, cardId, vacancy);
            productPage.render();
        } else {
            console.error('Вакансия не найдена');
        }
    }

    clickADD() {
        const newJobPage = new NewJobPage(this.parent, (newVacancy) => {
            this.data.push(newVacancy);
            console.log('Данные после добавления:', this.data);
            
            // Аккуратно обновляем только контейнер с карточками
            const container = this.pageRoot.querySelector('.cards-container');
            container.innerHTML = '';
            this.renderData(this.data, container);
            },
            this.data
        );
        newJobPage.render();
        console.log('Данные после добавления:', this.data);
    }
    clickEDIT(e) {
        const editJobPage = new EditJobPage(this.parent, (editVacancy) => {
            this.data = this.data.filter(item => item.id !== editVacancy.id);
            this.data.push(editVacancy);
            console.log('Данные после добавления:', this.data);
            
            // Аккуратно обновляем только контейнер с карточками
            const container = this.pageRoot.querySelector('.cards-container');
            container.innerHTML = '';
            this.renderData(this.data, container);
            },
            parseInt(e.target.dataset.id),
            this.data
        );
        editJobPage.render();
        console.log('Данные после добавления:', this.data);
    }

    clickDEL(e) {
        const cardId = parseInt(e.target.dataset.id);
        if (isNaN(cardId)) return;

        // Удаляем из массива данных
        this.data = this.data.filter(item => item.id !== cardId);
        
        // Удаляем с сервера (если нужно)
        ajax.delete(stockUrls.removeStockById(cardId), () => {
            console.log('Удалено с сервера');
        });
        
        // Обновляем UI
        const container = this.pageRoot.querySelector('.cards-container');
        if (container) {
            this.renderData(this.data, container);
        }
    }


    // 1.2
    countIdentic(){
        let count = 0
        let a
        let arr = []
        let arrDubl = {}
        for (let i = 0; i < this.data.length; i++){
            arr.push(this.data[i].code)
        }
        for (let i = 0; i < arr.length; i++){
            a = arr[i]
            if(arrDubl[a]) arrDubl[a] ++
            else arrDubl[a] = 1
        }
        for (let b in arrDubl){
            if (arrDubl[b] > 1) count += arrDubl[b]
        }
        return count
    }

    // 1.8
    srZnach(){
        let sum = 0
        if (this.data.length > 0){
            for (let i = 0; i < this.data.length; i++){
                sum += this.data[i].zp
            }
            return sum/this.data.length
        }
        else return 0
    }

    // 2.2
    diapazon(){
        let arr = []
        if (this.data.length > 0){
            for (let i = 0; i < this.data.length; i++){
                arr.push(this.data[i].id)
            }
            arr.sort((a, b) => a - b)
            let str = arr[0]
            let iter
            for (let i = 1; i < arr.length; i++){
                if (arr[i-1] + 1 === arr[i]) {
                    iter = true
                } 
                else {
                    if (!iter) {
                      str += ',' + arr[i]
                    } 
                    else {
                      str += '-' + arr[i-1] + ',' + arr[i]
                      iter = false
                    }
                }
            }
            if (iter)
                str += '-' + arr[arr.length-1]    
            return str
               
        }
        else return 0
    }

    // 3.8.1
    palindrome1(str1) {
        let str = str1.toLowerCase()

        let j = str.length - 1;
        for (let i = 0; i < j / 2; i++) {
            let x = str[i];
            let y = str[j - i];
            if (x != y) {
                return 'нет'
            }
        }
        return 'да'
    }

    // 3.8.2
    palindrome2(str1) {
        let str = str1.toLowerCase()
        let rev_str = "";
        for (let i = str.length - 1; i >= 0; i--) {
            rev_str += str[i];
        }
        if (rev_str === str) {
            return 'да'
        }
        else {
            return 'нет'
        }
    }

    foundFilter(){
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase();
        console.log(searchTerm);
        ajax.get(stockUrls.getStocks(), (data) => {
            const filtData = data.filter(card => {
                const cardText = card.title.toLowerCase();
                return cardText.includes(searchTerm);
            });
            this.pageRoot.querySelector('.cards-container').innerHTML = '';
            const container = this.pageRoot.querySelector('.cards-container');
            this.renderData(filtData, container);
        });
        
    }
     
    async render() {
        this.parent.innerHTML = ''

        const html = this.getHTML(this.countIdentic(), this.srZnach(), this.diapazon(), this.palindrome1("Привет"), this.palindrome2("Приветтевирп"))
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const shap = new Shapk(this.pageRoot)
        shap.render(this.clickCard.bind(this))

        const data = await this.getData();
        await this.renderData(data);
        const addButton = document.getElementById('add-zap')
        addButton.addEventListener('click', this.clickADD.bind(this))

        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', this.foundFilter.bind(this));

        const foo = new Foot(this.pageRoot)
        foo.render()
    }
}
