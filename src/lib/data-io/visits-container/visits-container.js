class VisitsContainer {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;
        this.template;
        this.elements = {};
    }

    init() {
        this.initElements();
        this.initEventListeners();
    }

    destroy() {
        if (this.elements === {}) {
            return;
        }
        // Todo
    }

    initElements() {
        this.template = this.initTemplate(this.props);
        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <div class="wrapper-container">
            <div class="wrapper-content">
                ${this.initEntry()}
                <button class="see-visit">
                    <h4 class="text-light see-visit-text text-extend">Guarda</h4>
                </button>
            </div>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-container");
    }

    initEntry() {
        let resp = '';

        this.props.forEach(element => {
            const { key, title, value, className } = element;

            resp += `
                <div class="padding-line">
                    <h4 id="${key}" class="text-light  text-visit-form">${title}:</h4>
                    <h4 class="${(className) ? className : ''} text-light padding-left text-visit-form">${value}</h4>
                </div>
                `;
        });

        return resp;
    }
}

export default VisitsContainer;
