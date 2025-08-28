import {ProductComponent} from "../../components/product/index.js";
import {Shapk} from "../../components/shapk/index.js";

import {Foot} from "../../components/foot/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id, data) {
        this.parent = parent
        this.id = id
        this.data = data
    }

    getData(callback) {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
            callback();
        });
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot)
        product.render(item)
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const shap = new Shapk(this.pageRoot)
        shap.render()
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        this.getData(() => {
            const foo = new Foot(this.pageRoot);
            foo.render();
        });
    }
}
