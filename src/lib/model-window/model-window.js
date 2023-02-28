class ModelWindow {
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

    initElements() {
        this.template = this.initTemplate();

        this.elements = {

        };

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
            <div class="wrapper-window-model">
                <div class="modal-window">
                    ${this.initPrenotation()}
                </div>
            </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > .wrapper-window-model");
    }

    initEntry() {
        let resp = '';

        this.props.forEach(element => {
            const { title, value, className } = element;

            console.log(element);

            resp += `
                <div class="prenotation-data">
                    <h4>  ${title ? title : ''}  <span class="${className ? className : ''} ">${value}</span> </h4>
                </div>
                `;
        });

        return resp;

    }

    initPrenotation() {
        let resp = '';

        resp += `
                <div class="logo-model-window">
                    <h3>Prenotazione effetuata <span class="text-accent">corettamente</span></h3>
                    </div>

                    <div class="wrapper-modal-content">

                        <div class="wrapper-prenotation-data">
                            <div class="logo-prenotation-data">
                                <h4>Vi asspettiamo</h4>
                            </div>
                            <div class="wrapper-data-prenotation">
                                ${this.initEntry()}
                            </div>
                        </div>

                        <button class="apply prenotation-apply">OK!</button>
                </div>
            `;


        return resp;
    }
}

export default ModelWindow;