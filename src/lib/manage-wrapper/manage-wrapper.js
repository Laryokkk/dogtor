import Field from "../field-wrapper/field-wrapper.js";
class ManageWrapper {
    constructor(parent, props, animalTittle) {
        this.parentElement = parent;
        this.props = props;
        this.template;
        this.templateField;
        this.elements = {};

        this.isValide = false;
        this.isValue = false;

        this.animalTittle = animalTittle;

    }

    init() {
        
        this.initElements();
        this.initEventListeners();
    }


    initElements() {
        this.template = this.initTemplate();

        console.log(this.template);

        this.elements = {
            dataEntry: this.template.querySelectorAll('.data-entry'),
            fieldWrapperCom: this.template.querySelector('.wrapper-field')
        };

        this.parentElement.appendChild(this.template);

        this.templateField = this.initFieldComponent(this.props);
        console.log(this.templateField);

        /* this.elements.fieldWrapperCom.appendChild(this.templateField); */
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

        console.log(this.elements.fieldWrapperCom);
        /*        this.elements.dataEntry.forEach((element) => {
                   element.addEventListener('input', (event) => {
                       
                       if ((element.value)) {
                           switch (element.type) {
       
                               case "text":
                                   element.classList.toggle('data-valid', true)
                                   if (this.validateText(element.value) === false) {
                                       element.classList.toggle('data-wrong', true)
                                   }
                                   break;
                               case "tel":
                                   element.classList.toggle('data-valid', true)
                                   if (this.isValidPhoneNumber(element.value) === false) {
                                       element.classList.toggle('data-wrong', true)
                                   }
                                   break;
       
                               case "email":
                                   element.classList.toggle('data-valid', true)
                                   if (this.validateEmail(element.value) === false) {
                                       element.classList.toggle('data-wrong', true)
                                   }
                                   break;
       
                               case "date":
                                   element.classList.toggle('data-valid', true)
                                   if (this.isValidDate(element.value) === false) {
                                       element.classList.toggle('data-wrong', true)
                                   }
                                   break;
       
                               case "number":
                                   element.classList.toggle('data-valid', true);
                                   if (this.isNumeric(element.value) === false) {
                                       element.classList.toggle('data-wrong', true)
                                   }
                                   break;
                               default:
                                   break;
                           }
                       } else {
                           element.classList.toggle('data-wrong', true)
                       }
                   });
               });
        */

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
        return templateElement.documentElement.querySelector("body> .wrapper-field");
    }
}

export default ManageWrapper;

