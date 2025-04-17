export class Shapk {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("back-button")
            .addEventListener("click", listener)
    }

    addListeners1(listener) {
        document
            .getElementById("filter-button")
            .addEventListener("click", listener)
    }

    addListeners2(listener) {
        document
            .getElementById("add-zap")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <header class="shapk">
                <div class="shapka-buttons">
                <button id="back-button" class="btn-home" type="button">🏠︎</button>
                <button id="filter-button" class="btn-home" type="button">☰</button>
                <button id="add-zap" class="btn-home1" type="button">добавить запись</button>

                </div>
                </header>
            `
        )
    }

    render(home, add) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(home)
        this.addListeners2(add)
        // this.addListeners1(filt)
        const toastTrigger = document.getElementById('zad12')
        const toastLiveExample = document.getElementById('ogo')
        if (toastTrigger) {
            toastTrigger.addEventListener('click', () => {
                const toast = new bootstrap.Toast(toastLiveExample)
            
                toast.show()
            })           
        }
    }
}