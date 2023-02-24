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

            console.log(isValid);

            dataEntry.classList.toggle('data-wrong', !isValid)
            dataEntry.classList.toggle('data-valid', isValid)
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
        const { key, title, className, placeHolder, inputType, value } = this.props;

        let temp = `<h4 class="${(className) ? className : ''} ">${value}</h4>`;

        if (inputType) {
            return `
                <div class="wrapper-data" id="${key}">
                    <h6>${title}:</h6>
                    <input class="value-data ${className}" placeholder="${(placeHolder) ? placeHolder : ''}">
                </div>
            `;
        }

        return `
                <div class="padding-line">
                    <h6 id="${key}">${title}:</h6>
                    <h6 class="padding-left ${className} ">${title !== "Doctor" ? temp : value}</h6>
                </div>
            `;
    }

    initAttributes() {
        const { maxLenght, inputType, key, value, minLength, maxLength } = this.props;
        const { dataEntry } = this.elements;
      
        if (maxLenght !== undefined) {
          dataEntry.setAttribute('max', maxLenght);
        }
      
        if (inputType !== undefined) {
          dataEntry.setAttribute('type', inputType);
        }
      
        if (key !== undefined) {
          dataEntry.setAttribute('id', key);
        }
      
        if (value !== undefined) {
          dataEntry.setAttribute('value', value);
        }
      
        if (minLength !== undefined) {
          dataEntry.setAttribute('minlength', minLength);
        }
      
        if (maxLength !== undefined) {
          dataEntry.setAttribute('maxlength', maxLength);
        }
      }
      
}

export default Field;
