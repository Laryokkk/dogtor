import Header from "../../lib/header/Header.js"
import ManageWrapper from "../../lib/data-io/manage-wrapper/manage-wrapper.js";
import DoctorPrenotationWrapper from "../../lib/data-io/doctor-prenotation-wrapper/doctor-prenotation-wrapper.js"
import DescriptionWrapper from "../../lib/data-io/description-wrapper/description-wrapper.js"
import ModelWindow from "../../lib/model-window/model-window.js";
import { getParam } from "../../utils/util-params.js";
import { Animal, Person, Description, PrenotationDoctor, PrenotationModalWindow } from "../../helpers/Helper.js";

console.log(getParam(window, 'idx'));

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

wrapper.menagerWrapper.addEventListener('apply-prenotation', (e) => handlerApply(e));


const handlerApply = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (checkBooleanArray(animalComponent.isValid()) && checkBooleanArray(personComponent.isValid()) && checkBooleanArray(descriptioComponent.isValid())) {
        const modelWindow = new ModelWindow(wrapper.menagerWrapper, PrenotationModalWindow)
        modelWindow.init();
    } else {
        const fiedsList = wrapper.menagerWrapper.querySelectorAll('.data-entry');

        fiedsList.forEach(filed => {
            if (filed.classList.contains('data-wrong') && filed.value === null) {
                filed.classList.toggle('data-wrong', true);
            } else if (!(filed.classList.contains('data-wrong')) && !(filed.classList.contains('data-valid')) && !(filed.classList.contains('data-output')) && !(filed.classList.contains('optional'))) {
                filed.classList.toggle('data-wrong', true);
            }
        });
    }
};
const handlerModalContent = (e) => {
    const { content } = e.detail;

    console.log(content);
};

wrapper.menagerWrapper.addEventListener('content-data', (e) => { handlerModalContent(e) });


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