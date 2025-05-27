// import {ButtonComponent} from "../../components/button/index.js";
import {ProductCardComponent} from "../../components/product-card/index.js";

import {Shapk} from "../../components/shapk/index.js";

import {Foot} from "../../components/foot/index.js";

import {ProductPage} from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [{
            id: 1,
            src: "https://www.mosvodokanal.ru/upload/iblock/d36/voditel.jpg",
            title: "Водитель автомобиля",
            zp: 80000,
            text: "от 80 000 ₽ на руки",
            detali: "<p>Требуемый опыт работы: 1–3 года.</p><p>Полная занятость, полный день</p>",
            code: 1
        },
        {
            id: 2,
            src: "https://www.mosvodokanal.ru/upload/iblock/b3b/slesar_avr.jpg",
            title: "Слесарь аварийно-восстановительных работ",
            zp: 95000,
            text: "от 95 000 ₽ на руки",
            detali: "<p>Требуемый опыт работы: не требуется</p><p>Пятидневная рабочая неделя, сменный график</p>",
            code: 2
        },
        {
            id: 3,
            src: "https://www.mosvodokanal.ru/upload/iblock/1ed/rabotnik_ozelenitel.jpg",
            title: "Рабочий зеленого хозяйства 3 разряда",
            zp: 59000,
            text: "от 59 000 ₽",
            detali: "<p>Требуемый опыт работы: не требуется</p><p>Полная занятость, полный день</p>",
            code: 3
        },]
    }

    getData() {
        return this.data
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML(m12, m18, m22, m381, m382) {
        return (
            `
                <div id="main-page" class="d-flex flex-column"><div/>
                <div class="zadania">
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
        const cardId = e.target.dataset.id
        const kai = this.data[this.FoundIndex(cardId)]
        const productPage = new ProductPage(this.parent, cardId, kai)
        productPage.render()
    } 
    clickADD() {
        let AddData = {
            id: 0,
            src: "https://www.mosvodokanal.ru/upload/iblock/d36/voditel.jpg",
            title: "Водитель автомобиля",
            zp: 80000,
            text: "от 80 000 ₽ на руки",
            detali: "<p>Требуемый опыт работы: 1–3 года.</p><p>Полная занятость, полный день</p>",
            code: 1
        }
        if (this.data.length >= 0){
            AddData.id = this.data.slice(-1)[0].id + 1
        }
        else{
            AddData.id = 1
        }
        this.data.push(AddData)
        this.render()
    } 

    clickDEL(e) {
        const cardId = e.target.dataset.id
        const kai = this.FoundIndex(cardId)
        if (kai !== -1){
            this.data.splice(kai, 1)
        }
        this.render()
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
            return 'нет'
        }
        else {
            return 'нет'
        }
    }

    foundFilter(){
        const searchInput = document.getElementById('searchInput');
        const searchTerm = searchInput.value.toLowerCase();
        console.log(searchTerm);
        const filtData = this.data.filter(card => {
            const cardText = card.title.toLowerCase();
            return cardText.includes(searchTerm);
        });
        this.pageRoot.querySelector('.cards-container').innerHTML = '';
        const container = this.pageRoot.querySelector('.cards-container');
        filtData.forEach((item) => {
            const productCard = new ProductCardComponent(container);
            productCard.render(item, this.clickCard.bind(this), this.clickDEL.bind(this));
        });
        
        return filtData;
    }
   
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML(this.countIdentic(), this.srZnach(), this.diapazon(), this.palindrome1("Привет"), this.palindrome2("Приветтевирп"))
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const shap = new Shapk(this.pageRoot)
        shap.render(this.clickCard.bind(this), this.clickADD.bind(this))
        
        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this), this.clickDEL.bind(this))
        })
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', this.foundFilter.bind(this));
        const foo = new Foot(this.pageRoot)
        foo.render()
    }
}


