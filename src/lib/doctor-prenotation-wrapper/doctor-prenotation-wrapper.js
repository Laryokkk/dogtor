class DoctorPrenotationWrapper{
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
        <div class="wrapper-manage-data">
            ${this.initEntry()}
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-manage-data");
    }

    initEntry() {
        let resp = '';

        this.props.forEach(element => {

            const { key, title, className,value} = element;

            resp += `
                <div class="padding-line">
                    <h4 id="${key}" class="text-light  text-visit-form">${title}:</h4>
                    <h4 class="${(className) ? className : ''} text-light padding-left text-visit-form">${value}</h4>
                </div>`
            ;
        });

        return resp;
    }
}

export default DoctorPrenotationWrapper;
