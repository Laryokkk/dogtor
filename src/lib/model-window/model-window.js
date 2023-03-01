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
                    ${this.initPrenotationWrapper()}
                </div>
            </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > .wrapper-window-model");
    }

    initPrenotationWrapper() {
        let resp = '';

        resp += `
        ${this.initPrenotationLogo()}

        <div class="wrapper-modal-content">

            <div class="wrapper-prenotation-data">
                ${this.initPrenotationData()}
                <div class="wrapper-data-prenotation">
                    ${this.initContentData()}
                </div>
            </div>

            <button class="apply prenotation-apply">OK!</button>
        </div>
            `;


        return resp;
    }

    initPrenotationLogo() {
        return ` 
        <div class="logo-model-window">
            ${this.initLogo()}
        </div>
            `;
    }

    initLogo() {
        let resp = '';

        this.props.forEach(element => {
            console.log(element.className);
            if (element.className === 'logo-model-window') {
                resp += `
                <h3>${element.title} <span class="text-accent">${element.value}</span></h3>
                `;
            }
        })

        return resp;
    }

    initPrenotationData() {
        let resp = ' ';

        this.props.forEach(element => {

            if (element.className === 'logo-prenotation-data') {
                console.log(element.className);
                resp += ` 
            <div class="logo-prenotation-data">
                <h4>${element.title}</h4>
            </div>
                `;
            }
        });

        return resp;
    }

    initContentData() {
        let resp = '';

        this.props.forEach(element => {

            if (element.title === 'Date') {
                resp += `
                <div class="prenotation-data">
                    <h4>  <span class="text-accent"> ${element.value}</span> </h4> 
                </div>
                `;
            }
            if (element.title === 'WhichTime') {
                resp += `
                <div class="prenotation-data">
                     <h4>  ${element.value} </h4>
                </div>
                `;
            }
            if (element.title === 'Time') {
                resp += `
                <div class="prenotation-data">
                    <h4> <span class="text-accent"> ${element.value}</span> </h4> 
                </div>
                `;
            }
        });

        return resp;

    }
}

export default ModelWindow;