import Field from "../field-wrapper/field-wrapper.js";
class ManageWrapper {
    constructor(parent, props, animalTittle) {
        this.parentElement = parent;
        this.props = props;
        this.template;
        this.templateField;
        this.elements = {};

        this.animalTittle = animalTittle;

    }

    init() {
        
        this.initElements();
        this.initEventListeners();
    }


    initElements() {
        this.template = this.initTemplate();

        this.elements = {
            dataEntry: this.template.querySelectorAll('.data-entry'),
            fieldWrapperCom: this.template.querySelector('.wrapper-field')
        };

        this.parentElement.appendChild(this.template);

        this.templateField = this.initFieldComponent();
    }

    initField(){
        this.props.forEach(props => {
            const fieldWrapper = new Field (this.elements.fieldWrapperCom, props)
            fieldWrapper.init();
            const el = fieldWrapper.render();
            this.elements.fieldWrapperCom.appendChild(el);
        }); 
    }

    initEventListeners() {

    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <div class="wrapper-manage-data">
            <div class="wrapper-logo">
                <h4 class="logo">${this.animalTittle}</h4>
            </div>
            <div class="wrapper-field">
  
             </div>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> div");
    }

    initFieldComponent(){
        
        const parser = new DOMParser();
        const templateString = `
        <div class="wrapper-manage-data">
             ${this.initField()}
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> div");
    }
}

export default ManageWrapper;

