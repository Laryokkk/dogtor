import Field from "../field-wrapper/field-wrapper.js";
class ManageWrapper {
    constructor(parent, props, animalTitle) {
        this.parentElement = parent;
        this.props = props;
        this.template;
        this.templateField;

        this.elements = {};
        this.listFileds = [];

        this.animalTitle = animalTitle;
    }

    init() {
        this.initElements();
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

            this.listFileds.push(fieldWrapper);
        }); 
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <div class="wrapper-manage-data">
            <div class="wrapper-logo">
                <h4 class="logo">${this.animalTitle}</h4>
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


    isValid() {
        const isValidArray = [];
    
        this.listFileds.forEach(filed => {
            
            isValidArray.push(filed.isValid);
        });
    
        
    
        return isValidArray;
    }
}

export default ManageWrapper;

