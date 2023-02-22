class DoctorPrenotationWrapper {
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
            applyBtn: this.template.querySelector('.apply'),
            cancelBtn: this.template.querySelector('.cancel'),
        };

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
        this.elements.applyBtn.addEventListener('click', (e) => {
            e.preventDefault();

            this.handlerApply();
        });

    }

    handlerApply() {
        this.parentElement.dispatchEvent(new CustomEvent('apply-prenotation', {
            bubbles: true,
        },
        ));
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <div class="prenotation-visit-doctor">
            <div class="wrapper-data-prenotation-doctor">
                ${this.initEntry()}
            </div>
            <div class="wrapper-btns">
                <button class="apply">
                    <h4 class="see-visit-text">Apply</h4>
                </button>
                <button class="cancel">
                    <h4 class="see-visit-text">Cancel</h4>
                </button>
            </div>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .prenotation-visit-doctor");
    }

    initEntry() {
        let resp = '';

        this.props.forEach(element => {

            const { key, title, className, value } = element;

            let temp = `<h4 class="${(className) ? className : ''} ">${value}</h4>`;

            resp += `
            <div class="padding-line">
                <h6 id="${key}">${title}:</h6>
                <h6 class="padding-left">${title !== "Doctor" ? temp : value}</h6>
            </div>`
                ;
        });

        return resp;
    }
}

export default DoctorPrenotationWrapper;
