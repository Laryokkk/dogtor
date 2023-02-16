import Header from "../../lib/header/Header.js";
import ManageWrapper from "../../lib/manage-wrapper/manage-wrapper.js";
import DoctorPrenotationWrapper from "../../lib/doctor-prenotation-wrapper/doctor-prenotation-wrapper.js";
import { Animal,Person, Description, Doctor,Visit } from "../../helpers/Helper.js";

const wrapper = {
    header: document.querySelector('section#header'),
    menagerWrapper: document.querySelector('section.container')
};

const props = {
    header: {},
};

Animal.forEach(animalProps =>{
    const animalComponent = new ManageWrapper(wrapper.menagerWrapper, animalProps);
    animalComponent.init();
});

Person.forEach(personProps => {
    const personComponent = new ManageWrapper(wrapper.menagerWrapper, personProps);
    personComponent.init();
});

/* Description.forEach(descriptionProps =>{
    const descriptioComponent = new ManageWrapper(wrapper.menagerWrapper, descriptionProps);
    descriptioComponent.init();
}); */

//TODO
/* Visit.forEach(doctorsProps =>{
    const doctorComponent = new DoctorPrenotationWrapper(wrapper.menagerWrapper, doctorsProps);
    doctorComponent.init();
});
 */




const header = new Header(wrapper.header, props.header);
header.init();