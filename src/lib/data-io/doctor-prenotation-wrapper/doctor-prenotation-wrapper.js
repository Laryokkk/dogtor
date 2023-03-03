import Field from "../field-wrapper/field-wrapper.js";

class DoctorPrenotationWrapper {
    constructor(parent, props, doctorTittle, propsPriceDoctor, priceDoctorTittle) {
        this.parentElement = parent;
        this.props = props;
        this.propsPriceDoctor = propsPriceDoctor;
        this.priceDoctorTittle = priceDoctorTittle;

        this.templateField;

        this.template;
        this.elements = {};
        this.doctorTittle = doctorTittle
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
            fieldWrapperCom: this.template.querySelector('.wrapper-data-prenotation-doctor')
        };

        this.parentElement.appendChild(this.template);

        this.templateField = this.initFieldComponent();
    }

    initField() {
        this.props.forEach(props => {
            const fieldWrapper = new Field(this.elements.fieldWrapperCom, props)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.fieldWrapperCom.appendChild(el);
        });
    }

    initFieldPrezzoDoctor() {
        if (this.propsPriceDoctor) {
            this.propsPriceDoctor.forEach(props => {
                const fieldWrapper = new Field(this.elements.fieldWrapperCom, props)
                fieldWrapper.init();
                const el = fieldWrapper.render();
                this.elements.fieldWrapperCom.appendChild(el);
            });
        }
    }

    initEventListeners() {
        this.elements.applyBtn.addEventListener('click', (e) => this.handlerApply(e));
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
        <h4 class="text-accent">${this.doctorTittle}</h4>
            <div class="wrapper-content-dottore">
                <div class="wrapper-data-prenotation-doctor">
                </div>
                <div class="wrapper-btns">
                    <button class="apply" type="submit">
                        <h4 class="see-visit-text">Apply</h4>
                    </button>
                    <button class="cancel">
                        <h4 class="see-visit-text">Cancel</h4>
                    </button>
                </div>
            </div>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .prenotation-visit-doctor");
    }

    initFieldComponent() {

        const parser = new DOMParser();
        const templateString = ` 
        <div class="wrapper-data-prenotation-doctor">
            ${this.initField()}
            ${this.initFieldPrezzoDoctor()}
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-data-prenotation-doctor");
    }
}

export default DoctorPrenotationWrapper;
