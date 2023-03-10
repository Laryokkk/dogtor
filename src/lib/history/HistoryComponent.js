class HistoryComponent {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;

        this.template;
    }

    init() {
        this.initElements();
    }

    initElements() {
        this.template = this.initTemplate();

        this.parentElement.appendChild(this.template);
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `<div class="history-component">
            ${this.initFileds()}
            <a href="/classi/5e/vysotskyy/src/routes/manage-data/index.html?idx=${this.props.idx}">
                <button class="button-history">
                    <h4 class="text-extend">
                        Guarda
                    </h4>
                </button>
            </a>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initFileds() {
        let response = '';
        
        this.props.list.forEach(prop => {
            response += this.initField(prop);
        });

        return response;
    }

    initField(props) {
        return `<h4 class="text">${props.title}: <span class="${props.className}">${props.value}</span></h4>`;
    }
}

export default HistoryComponent;