import Field from "../field-wrapper/field-wrapper.js";
class DescriptionWrapper {
    constructor(parent, props, descriptionTittle) {
        this.parentElement = parent;
        this.props = props;
        this.template;
        this.elements = {};

        this.descriptionTittle = descriptionTittle;


        this.listFileds = [];
    }

    init() {
        this.initElements();
    }

    initElements() {
        this.template = this.initTemplate(this.props);

        this.elements = {
            dataEntry: this.template.querySelectorAll('.data-entry'),
            fieldWrapperCom: this.template.querySelector('.wrapper-textarea')
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
            this.listFileds.push(fieldWrapper);
        }); 
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
            <div class="wrapper-description">
                <div class="wrapper-logo">
                    <h4 class="logo-description ">${this.descriptionTittle}</h4>
                </div>
                <div class="wrapper-textarea">
                </div>
            </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> div");
    }

    initFieldComponent(){
        
        const parser = new DOMParser();
        const templateString = `
        <div class="wrapper">
             ${this.initField()}
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> div");
    }

    isValid() {
        const isValidArray = [];

        
        this.listFileds.forEach(filed => {
            
            isValidArray.push(filed.isValid);
        });

        return isValidArray;
    }
}

export default DescriptionWrapper;

