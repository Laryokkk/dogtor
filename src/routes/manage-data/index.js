import Header from "../../lib/header/Header.js"
import ManageWrapper from "../../lib/data-io/manage-wrapper/manage-wrapper.js";
import DoctorPrenotationWrapper from "../../lib/data-io/doctor-prenotation-wrapper/doctor-prenotation-wrapper.js"
import DescriptionWrapper from "../../lib/data-io/description-wrapper/description-wrapper.js"
import ModelWindow from "../../lib/model-window/model-window.js";
import { Animal, Person, Description, PrenotationDoctor, PrenotationModalWindow } from "../../helpers/Helper.js";

const wrapper = {
    header: document.querySelector('section#header'),
    menagerWrapper: document.querySelector('form.container'),
};

const props = {
    header: {},
};

const animalComponent = new ManageWrapper(wrapper.menagerWrapper, Animal.list, Animal.title);
animalComponent.init();

const personComponent = new ManageWrapper(wrapper.menagerWrapper, Person.list, Person.title);
personComponent.init();


const descriptioComponent = new DescriptionWrapper(wrapper.menagerWrapper, Description.list, Description.title);
descriptioComponent.init();

const prenotationDoctorComponent = new DoctorPrenotationWrapper(wrapper.menagerWrapper, PrenotationDoctor.list);
prenotationDoctorComponent.init();

const modelWindow = new ModelWindow(wrapper.menagerWrapper, PrenotationModalWindow.list)

wrapper.menagerWrapper.addEventListener('apply-prenotation', (e) => handlerApply(e));

const handlerApply = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(checkBooleanArray(animalComponent.isValid()));
    console.log(checkBooleanArray(personComponent.isValid()));
    console.log(checkBooleanArray(descriptioComponent.isValid()));


    if (checkBooleanArray(animalComponent.isValid()) && checkBooleanArray(personComponent.isValid()) && checkBooleanArray(descriptioComponent.isValid())) {

        modelWindow.init();
        const btnSubmitWindowModal = document.querySelector('.prenotation-apply');
        const wrapperWindwoModal = document.querySelector('.wrapper-window-model');

        btnSubmitWindowModal.addEventListener('click', () => {
            wrapperWindwoModal.classList.toggle('display-hide', true);
            wrapper.menagerWrapper.removeChild(wrapperWindwoModal);

        })
    } else {
        const fiedsList = wrapper.menagerWrapper.querySelectorAll('.data-entry');

        fiedsList.forEach(filed => {
            if (filed.classList.contains('data-wrong') && filed.value === null) {
                filed.classList.toggle('data-wrong', true);
            }else if (!(filed.classList.contains('data-wrong')) && !(filed.classList.contains('data-valid')) && !(filed.classList.contains('data-output')) && !(filed.classList.contains('optional'))) {
                filed.classList.toggle('data-wrong', true);
            }
        });
    }
};

function checkBooleanArray(boolArray) {
    let allTrue = true;

    boolArray.forEach(boolValue => {
        if (boolValue === false) {
            allTrue = false;
        }
    });

    return allTrue;
}





const cancelBtn = document.querySelector('.cancel');


cancelBtn.addEventListener('click', () => {
    location.href = "../index.html";
});

const header = new Header(wrapper.header, props.header);
header.init();