import Header from "../../lib/header/Header.js";
import ManageWrapper from "../../lib/manage-wrapper/manage-wrapper.js";
import DoctorPrenotationWrapper from "../../lib/doctor-prenotation-wrapper/doctor-prenotation-wrapper.js";
import DescriptionWrapper from "../../lib/description-wrapper/description-wrapper.js";
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

Description.list.forEach(props => {
    const descriptioComponent = new DescriptionWrapper(wrapper.menagerWrapper, props);
    descriptioComponent.init();
});


PrenotationDoctor.forEach(prenotationDoctorProps => {
    const prenotationDoctorComponent = new DoctorPrenotationWrapper(wrapper.menagerWrapper, prenotationDoctorProps);
    prenotationDoctorComponent.init();
});

wrapper.menagerWrapper.addEventListener('apply-prenotation', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const dataEntry = document.querySelector('.data-entry');

    if (dataEntry.value == '') {
        dataEntry.classList.toggle('data-valid', true)
    }

/*     dataEntry.forEach((element) => {
        if (element.value === '') {
            element.classList.toggle('data-valid', true)
        }
    }); */
});

const cancelBtn = document.querySelector('.cancel');

cancelBtn.addEventListener('click', (event) => {
    location.href = "../index.html";
});

const header = new Header(wrapper.header, props.header);
header.init();