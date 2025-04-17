export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
                <div class="card mb-3" style="width: 1200px; ">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.src}" class="img-fluid" alt="картинка">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data.title}</h5>
                                <p class="card-text">${data.text}</p>
                                <p class="card-detali">${data.detali}</p>
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
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
        
        const toastTrigger = document.getElementById('report')
        const toastLiveExample = document.getElementById('liveToast')
        if (toastTrigger) {
            toastTrigger.addEventListener('click', () => {
                const toast = new bootstrap.Toast(toastLiveExample)
            
                toast.show()
            })           
        }
    }
}