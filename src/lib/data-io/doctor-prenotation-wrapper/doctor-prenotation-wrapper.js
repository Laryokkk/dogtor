import Field from "../field-wrapper/field-wrapper.js";

class DoctorPrenotationWrapper {
    constructor(parent, props, doctorTittle, propsPriceDoctor, priceDoctorTittle, userState) {
        this.parentElement = parent;
        this.props = props;
        this.propsPriceDoctor = propsPriceDoctor;
        this.priceDoctorTittle = priceDoctorTittle;
        this.userState = userState;


        this.templateField;

        this.template;
        this.elements = {};
        this.listFileds = [];
        this.listPriceFields = [];
        this.doctorTittle = doctorTittle
    }

    init() {
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.template = this.initTemplate(this.props, this.propsPriceDoctor);

        this.elements = {
            applyBtn: this.template.querySelector('.apply'),
            cancelBtn: this.template.querySelector('.cancel'),
            fieldWrapperCom: this.template.querySelector('.wrapper-data-prenotation-doctor')
        };

        this.parentElement.appendChild(this.template);

        this.initField();
        this.initFieldPrezzoDoctor();
    }


    initField() {
        this.props.forEach(props => {
            const fieldWrapper = new Field(this.elements.fieldWrapperCom, props)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.fieldWrapperCom.appendChild(el);

            this.listFileds.push(fieldWrapper);
        });
    }

    initFieldPrezzoDoctor() {
        if (this.propsPriceDoctor) {
            this.propsPriceDoctor.forEach(props => {
                const fieldWrapper = new Field(this.elements.fieldWrapperCom, props)
                fieldWrapper.init();
                const el = fieldWrapper.render();
                this.elements.fieldWrapperCom.appendChild(el);

                this.listPriceFields.push(fieldWrapper);
            });
        }
    }


    initEventListeners() {
        if (!this.userState) {
            this.elements.applyBtn.addEventListener('click', (e) => this.handlerApply(e));
        }
    }

    handlerApply() {
        this.parentElement.dispatchEvent(new CustomEvent('apply-prenotation', {
            bubbles: true,
        },
        ));
    }

    initTemplate() {
        const parser = new DOMParser();

        let templateString;
        debugger
        if (this.doctorTittle) {
            templateString = `
        <div class="prenotation-visit-doctor">
        <h4 class="text-accent">${this.doctorTittle}</h4>
            <div class="wrapper-content-dottore">
                <div class="wrapper-data-prenotation-doctor">
                </div>
                <div class="wrapper-btns">
                    <button class="apply" type="submit">
                        <h4 class="see-visit-text">Finisci</h4>
                    </button>
                </div>
            </div>
        </div>`;
        } if (this.userState) {
            templateString = `
            <div class="prenotation-visit-doctor">
                <div class="wrapper-content-dottore">
                    <div class="wrapper-data-prenotation-doctor">
                    </div>
                </div>
            </div>`;
        } else if(!this.doctorTittle){
            templateString = `
            <div class="prenotation-visit-doctor">
                <div class="wrapper-content-dottore">
                    <div class="wrapper-data-prenotation-doctor">
                    </div>
                    <div class="wrapper-btns">
                        <button class="apply" type="submit">
                            <h4 class="see-visit-text">Accetta</h4>
                        </button>
                        <button class="cancel">
                            <h4 class="see-visit-text">Cancella</h4>
                        </button>
                    </div>
                </div>
            </div>`;
        }
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .prenotation-visit-doctor");
    }

    initFieldComponent() {
        let templateString;
        const parser = new DOMParser();
        if (this.doctorTittle) {
            templateString = ` 
            <div class="wrapper-data-prenotation-doctor">
                ${this.initField()}
                ${this.initFieldPrezzoDoctor()}
            </div>`;
        } else {
            templateString = ` 
            <div class="wrapper-data-prenotation-doctor">
                ${this.initField()}
            </div>`;
        }
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-data-prenotation-doctor");
    }

    isValid() {
        const isValidArray = [];

        this.listFileds.forEach(field => {
            isValidArray.push(field.isValid);
        });

        this.listPriceFields.forEach(field => {
            isValidArray.push(field.isValid);
        });

        return isValidArray;
    }

}

export default DoctorPrenotationWrapper;
