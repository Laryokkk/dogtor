class DescriptionWrapper {
    constructor(parent, props, descriptionTittle) {
        this.parentElement = parent;
        this.props = props;
        console.log(props);
        this.template;
        this.elements = {};

        this.descriptionTittle = descriptionTittle;
    }

    init() {
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.template = this.initTemplate(this.props);

        this.elements = {
            dataEntry: this.template.querySelector('.description-problem')
        };

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
        const { dataEntry } = this.elements;

        dataEntry.addEventListener('input', () => {

            this.props.forEach(propsElement => {

                const isValid = propsElement.validate(dataEntry.value);

                dataEntry.classList.toggle('data-wrong', !isValid)
                dataEntry.classList.toggle('data-valid', isValid)

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
        return templateElement.documentElement.querySelector("body> div");
    }

    initEntry() {
        const { className } = this.props;

        console.log(this);

        return ` 
            <div class="wrapper-logo">
                <h4 class="logo-description">${this.descriptionTittle}</h4>
            </div>
            <textarea class="description-problem ${className}" cols="30" rows="10"></textarea>
        `;
    }

}

export default DescriptionWrapper;

