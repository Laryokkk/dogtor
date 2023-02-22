 import Field from "../field-wrapper/field-wrapper.js";


class Field {
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
        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {

    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <div class="wrapper-container">
        ${this.initEntry()}
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-container");
    }

    initEntry() {
        let resp = '';

        this.props.forEach(element => {

            const { key, title, inputType, placeHolder, value, validate, className, maxLenght, minLenght } = element;

            this.isValide = validate;
            this.isValue = value;



            resp += `<div class="wrapper-data" id="${key}">
                        <h6>${title}:</h6>
                        <input type="${inputType}" class="value-data ${className}" value="${(value === "") ? '' : value}" max="${(maxLenght) ? maxLenght : ''}" minlenght="${(minLenght) ? minLenght : ''}"  maxlength="${(maxLenght) ? maxLenght : ''}" placeholder="${(placeHolder) ? placeHolder : ''}">
                    </div>`
                ;
        });

        return resp;
    }
}

export default Field;
