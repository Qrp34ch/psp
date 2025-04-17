export class Foot {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
                <footer class="foot"></footer>
            `
        )
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}