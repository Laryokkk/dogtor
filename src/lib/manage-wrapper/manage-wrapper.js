class ManageWrapper {
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
        let temp = this.props.title;
        console.log(temp);
        const parser = new DOMParser();
        const templateString = `
        <div class="wrapper-manage-data">
            <div class="wrapper-logo">
                <h4 class="logo">${temp}</h4>
            </div>
            ${this.initEntry()}
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-manage-data");
    }

    initEntry() {
        let resp = '';

        this.props.forEach(element => {

            const { key, title, inputType,placeHolder} = element;

            resp += `<div class="wrapper-data" id="${key}">
                        <h6>${title}:</h6>
                        <input type="${inputType}" class="value-data" placeholder="${placeHolder ? placeHolder : ''}">
                    </div>`
            ;
        });

        return resp;
    }
}

export default ManageWrapper;

