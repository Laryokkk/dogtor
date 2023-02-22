class DescriptionWrapper {
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
        this.template = this.initTemplate(this.props);

        this.elements = {
            dataEntry: this.template.querySelectorAll('.data-entry')
        };

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {


        this.elements.dataEntry.forEach((element) => {
            element.addEventListener('input', (event) => {
                debugger
                element.classList.toggle('data-valid', true)
                if (this.validateText(element.value) === false) {
                    element.classList.toggle('data-wrong', true)
                }
            });
        });

    }



    initTemplate() {
        const parser = new DOMParser();

        const templateString = `
        <div class="wrapper-description">
        ${this.initEntry()}
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-description");
    }

    initEntry() {
        let resp = '';

        this.props.forEach(element => {

            const { title, className } = element;

            resp += ` 
            <div class="wrapper-logo">
                <h4 class="logo-description">${title}</h4>
            </div>
            <textarea class="description-problem ${className}" cols="30" rows="10"></textarea>`
                ;
        });

        return resp;
    }


    validateText(text) {
        if (text.length === 0) {
            return false;
        }
        if (/[^a-zA-Z\s]/.test(text)) {
            return false;
        }
        return true;
    }

}

export default DescriptionWrapper;

