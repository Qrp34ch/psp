export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    getHTML(data) {
        return (
            `
                <div class="card">
                    <img class="card-img-top" src="${data.src}" alt="картинка">
                    <div class="card-body">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <div class="buttons">
                            <button class="btn btn-primary details-btn" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                            <button class="btn btn-primary edit-btn" id="edit-card-${data.id}" data-id="${data.id}" style="margin-left: 10px;"">Изменить</button>
                            <button class="btn btn-primary delete-btn" id="del-card-${data.id}" data-id="${data.id}" style="margin-left: 10px;"">Удалить</button>
                        </div>
                    </div>
                </div>
            `
        )
    }

    render(item, clickHandler, deleteHandler, editHandler) {
        const html = this.getHTML(item)
               
        this.parent.insertAdjacentHTML('beforeend', html);
        
        // Находим элементы только что добавленной карточки
        // const cardElement = this.parent.querySelector(`.card[data-id="${item.id}"]`);
        const cardElement = this.parent.lastElementChild;
        const detailsButton = cardElement.querySelector('.details-btn');
        const deleteButton = cardElement.querySelector('.delete-btn');
        const editButton = cardElement.querySelector('.edit-btn');
        
        // Добавляем обработчики
        detailsButton.addEventListener('click', clickHandler);
        deleteButton.addEventListener('click', deleteHandler);
        editButton.addEventListener('click', editHandler);
    }
}
