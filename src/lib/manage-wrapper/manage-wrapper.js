
class ManageWrapper {
    constructor(parent, props,animalTittle) {
        this.parentElement = parent;
        this.props = props;
        this.template;
        this.elements = {};

        this.isValide = false;
        this.isValue = false;

        this.animalTittle = animalTittle;

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
 /*        this.elements.dataEntry.forEach((element) => {
            element.addEventListener('input', (event) => {
                debugger
                if ((element.value)) {
                    switch (element.type) {

                        case "text":
                            element.classList.toggle('data-valid', true)
                            if (this.validateText(element.value) === false) {
                                element.classList.toggle('data-wrong', true)
                            }
                            break;
                        case "tel":
                            element.classList.toggle('data-valid', true)
                            if (this.isValidPhoneNumber(element.value) === false) {
                                element.classList.toggle('data-wrong', true)
                            }
                            break;

                        case "email":
                            element.classList.toggle('data-valid', true)
                            if (this.validateEmail(element.value) === false) {
                                element.classList.toggle('data-wrong', true)
                            }
                            break;

                        case "date":
                            element.classList.toggle('data-valid', true)
                            if (this.isValidDate(element.value) === false) {
                                element.classList.toggle('data-wrong', true)
                            }
                            break;

                        case "number":
                            element.classList.toggle('data-valid', true);
                            if (this.isNumeric(element.value) === false) {
                                element.classList.toggle('data-wrong', true)
                            }
                            break;
                        default:
                            break;
                    }
                } else {
                    element.classList.toggle('data-wrong', true)
                }
            });
        });
 */

    }

    initTemplate() {
        let arrayLength = this.props.length;
        console.log(this.animalTittle);
        const parser = new DOMParser();
        const templateString = `
        <div class="wrapper-manage-data">
            <div class="wrapper-logo">
                <h4 class="logo">${this.animalTittle}</h4>
                ${this.initEntry()}
            </div>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-manage-data");
    }

    initEntry() {
        let resp = '';

        this.props.forEach(element => {

            const { key, title, inputType, placeHolder, value, validate, className, maxLenght, minLenght } = element;

            console.log(validate);

            resp += `<div class="wrapper-data" id="${key}">
                        <h6>${title}:</h6>
                        <input type="${inputType}" class="value-data ${className}" value="${(value === "") ? '' : value}" max="${(maxLenght) ? maxLenght : ''}" minlenght="${(minLenght) ? minLenght : ''}"  maxlength="${(maxLenght) ? maxLenght : ''}" placeholder="${(placeHolder) ? placeHolder : ''}">
                    </div>`
                ;
        });

        return resp;
    }

/*     validateText(text) {
        if (text.length === 0) {
            return false;
        }
        if (/[^a-zA-Z\s]/.test(text)) {
            return false;
        }
        return true;
    }

    isValidPhoneNumber(inputStr) {
        const tenDigitRegex = /^\d{10}$/;
        return tenDigitRegex.test(inputStr);
      }

    validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            return false;
        }
        return true;
    }

    isValidDate(dateString) {
        if (typeof dateString !== 'string') {
            return false;
        }
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return false;
        }
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        if (year < 0 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
            return false;
        }
        return true;
    }

    isNumeric(inputStr) {
        const numericRegex = /^\d+$/;
        return numericRegex.test(inputStr);
    } */
}

export default ManageWrapper;

