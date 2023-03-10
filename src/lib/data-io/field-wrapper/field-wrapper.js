import { createOptions } from "../../../utils/util-select.js";
class Field {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;
        this.template;
        this.elements = {};

        this.isValid = props.value !== '';

        this.typeAnimal;
    }

    init() {
        this.initElements();
        this.initEventListeners();
    }

    render() {
        return this.template;
    }

    initElements() {
        this.template = this.initTemplate();

        this.elements = {
            dataEntry: this.template.querySelector('.data-entry'),
        };

        this.initAttributes();
    }

    initEventListeners() {
        const { dataEntry } = this.elements;


        dataEntry.addEventListener('input', () => {

            const isValid = this.props.validate(dataEntry.value);

            dataEntry.classList.toggle('data-wrong', !isValid);
            dataEntry.classList.toggle('data-valid', isValid);

            this.isValid = isValid;

            this.props.value = dataEntry.value;

        });
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
            <div class="wrapper-container-field">
                ${this.initEntry()}
            </div>
        `;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initEntry() {
        const { key, title, className, classNameSecond, placeHolder, inputType, value, required } = this.props;

        let temp = `<h4 class="${(className) ? className : ''} ">${value}</h4>`;

        if (inputType === 'text' || inputType === 'number' || inputType === 'tel' || inputType === 'email' || inputType === 'date') {
            return `
                <div class="wrapper-data" id="${key}">
                    <div> ${title} </div>
                    <input class="value-data ${className}" placeholder="${(placeHolder) ? placeHolder : ''}" value="${value ? value : ''}" ${(required) ? required : ''}>
                </div>
            `;
        }
        if (inputType === 'selector') {
            return `
            <div class="wrapper-data anTemo">
                <div> ${title} </div>
                ${this.initSelect()}
            </div>
        `;
        }
        if (inputType === 'prenotationDoctor') {
            return `
            <div class="padding-line">
                <h6 id="${key}">${title}:</h6>
                <h6 class="padding-left ${className} ">${title !== "Doctor" ? temp : value}</h6>
            </div>
        `;
        }
        if (inputType === 'textarea' && classNameSecond === 'conclusionnDoctor') {
            return `
            <div class="conclussion-doctor">
                <h5>${title}</h5>
            </div>
            <textarea class="description-problem ${className} ${classNameSecond}" ${required} cols="30" rows="10"></textarea>
        `;
        }
        if (inputType === 'textarea') {
            return `
            <textarea class="description-problem ${className}" ${required} cols="30" rows="10"></textarea>`;
        }
    }


    initSelect() {

        return `
        <select class="${this.props.className} animalType" ${this.props.required} required>
            ${createOptions(this.props.option, this.props.value)}
        </select>
        `
    }

    initAttributes() {
        const { maxLenght, inputType, key, value, minLength, className } = this.props;
        const { dataEntry } = this.elements;

        const arr = className.split(' ');
        const dataDoctor = arr.filter(element => element.includes('data-doctor'))[0];

        if (inputType === 'textarea') {
            dataEntry.innerHTML = value;
        }

        if (inputType !== undefined && inputType === 'selestor') {
        } else if (inputType !== undefined) {

            dataEntry.setAttribute('type', inputType);
        }

        if (key !== undefined || inputType === 'selestor') {
        } else if (key !== undefined) {
            dataEntry.setAttribute('id', key);
        }

        const match = className.match(/data-entry\s+(\w+)/i);
        const substring = match ? match[1] : null;

        if (substring) {

            this.isValid = true;
        } else {
            dataEntry.setAttribute('value', value);
        }

        if (minLength !== undefined) {
            dataEntry.setAttribute('minlength', minLength);
        }

        if (maxLenght !== undefined) {
            dataEntry.setAttribute('maxlength', maxLenght);
        }

        if (dataDoctor === 'data-doctor') {
            this.isValid = false;
        }
    }
}




export default Field;
