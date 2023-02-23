class DescriptionWrapper {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;
        console.log(props);
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
            dataEntry: this.template.querySelector('.description-problem')
        };

        this.parentElement.appendChild(this.template);
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
        <div class="wrapper-description">
        ${this.initEntry()}
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-description");
    }

    initEntry() {
        const { title, className } = this.props;

        return ` 
            <div class="wrapper-logo">
                <h4 class="logo-description">${title}</h4>
            </div>
            <textarea class="description-problem ${className}" cols="30" rows="10"></textarea>
        `;
    }

}

export default DescriptionWrapper;

