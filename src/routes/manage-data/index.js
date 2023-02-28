import Header from "../../lib/header/Header.js"
import ManageWrapper from "../../lib/data-io/manage-wrapper/manage-wrapper.js";
import DoctorPrenotationWrapper from "../../lib/data-io/doctor-prenotation-wrapper/doctor-prenotation-wrapper.js"
import DescriptionWrapper from "../../lib/data-io/description-wrapper/description-wrapper.js"
import { Animal, Person, Description, PrenotationDoctor } from "../../helpers/Helper.js";

const wrapper = {
    header: document.querySelector('section#header'),
    menagerWrapper: document.querySelector('section.container'),

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

wrapper.menagerWrapper.addEventListener('apply-prenotation', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const dataEntry = document.querySelector('.data-entry');

    if (dataEntry.value === '') {
        dataEntry.classList.toggle('data-valid', true)
    }
});

const cancelBtn = document.querySelector('.cancel');

cancelBtn.addEventListener('click', (event) => {
    location.href = "../index.html";
});

const header = new Header(wrapper.header, props.header);
header.init();