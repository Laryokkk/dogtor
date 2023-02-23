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
            fieldWrapper: this.parentElement.querySelector('.wrapper-field'),
            dataEntry: this.template.querySelector('.value-data'),
        };

        this.elements.dataEntry.setAttribute('max', this.props.maxLenght);
        this.elements.dataEntry.setAttribute('type', this.props.inputType);
        this.elements.dataEntry.setAttribute('id', this.props.key);
        this.elements.dataEntry.setAttribute('value', this.props.value);
        this.elements.dataEntry.setAttribute('minlenght', this.props.minLenght);
        this.elements.dataEntry.setAttribute('maxlength', this.props.maxLenght);

    }

    initEventListeners() {
        const { dataEntry } = this.elements;

        dataEntry.addEventListener('input', () => {
            const isValid = this.props.validate(dataEntry.value);

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
        const { key, title,className,placeHolder} = this.props;

        return `
            <div class="wrapper-data" id="${key}">
                <h6>${title}:</h6>
                <input class="value-data ${className}" placeholder="${(placeHolder) ? placeHolder : ''}">
            </div>
        `;
    }


}

export default Field;
