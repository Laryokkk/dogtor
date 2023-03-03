import Header from "../../lib/header/Header.js"
import UtilFetch from "../../utils/util-fetch.js";
import ManageWrapper from "../../lib/data-io/manage-wrapper/manage-wrapper.js";
import DoctorPrenotationWrapper from "../../lib/data-io/doctor-prenotation-wrapper/doctor-prenotation-wrapper.js"
import DescriptionWrapper from "../../lib/data-io/description-wrapper/description-wrapper.js"
import ModelWindow from "../../lib/model-window/model-window.js";
import { getParam } from "../../utils/util-params.js";
import { Animal, Person, Description, PrenotationDoctor, PrenotationModalWindow, descibtionDoctor, conclusionnDoctor, priceDoctor } from "../../helpers/Helper.js";

const wrapper = {
    header: document.querySelector('section#header'),
    menagerWrapper: document.querySelector('form.container'),
};

const props = {
    header: {},
};

const result = checkPermission();
console.log(result);

if (result === 'doctor') {
    const animalComponent = new ManageWrapper(wrapper.menagerWrapper, Animal.list, Animal.title);
    animalComponent.init();

    const personComponent = new ManageWrapper(wrapper.menagerWrapper, Person.list, Person.title);
    personComponent.init();


    const descriptioComponent = new DescriptionWrapper(wrapper.menagerWrapper, descibtionDoctor.list, descibtionDoctor.title);
    descriptioComponent.init();

    const prenotationDoctorComponent = new DoctorPrenotationWrapper(wrapper.menagerWrapper, conclusionnDoctor.list, conclusionnDoctor.title, priceDoctor.list, priceDoctor.title);
    prenotationDoctorComponent.init();

    wrapper.menagerWrapper.addEventListener('apply-prenotation', (e) => handlerApply(e));

    const handlerApply = async (e) => {

        if (checkBooleanArray(animalComponent.isValid()) && checkBooleanArray(personComponent.isValid()) && checkBooleanArray(descriptioComponent.isValid())) {
            let statusModalWindow = "cancel";
            const modelWindow = new ModelWindow(wrapper.menagerWrapper, PrenotationModalWindow, statusModalWindow)
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
        console.log("Heeko");
        console.log(content);


    };
    const cancelBtn = document.querySelector('.cancel');


    cancelBtn.addEventListener('click', () => {
        location.href = "../index.html";
    });

    wrapper.menagerWrapper.addEventListener('content-data', (e) => { handlerModalContent(e) });

}

if (result === 'admin') {

    {
        const animalComponent = new ManageWrapper(wrapper.menagerWrapper, Animal.list, Animal.title);
        animalComponent.init();

        const personComponent = new ManageWrapper(wrapper.menagerWrapper, Person.list, Person.title);
        personComponent.init();


        const descriptioComponent = new DescriptionWrapper(wrapper.menagerWrapper, Description.list, Description.title);
        descriptioComponent.init();

        const prenotationDoctorComponent = new DoctorPrenotationWrapper(wrapper.menagerWrapper, PrenotationDoctor.list);
        prenotationDoctorComponent.init();

        wrapper.menagerWrapper.addEventListener('apply-prenotation', (e) => handlerApply(e));

        const handlerApply = async (e) => {
            e.preventDefault();
            e.stopPropagation();


            const {
                0: { title: Nome, value: nomeAnimale, },
                1: { title: DatadiNascita, value: dataDiNascita, },
                2: { title: LuogodiNascita, value: luogoDiNascita, },
                3: { title: LuogodiResidenza, value: luogoDiResodenza, },
                4: { title: titChipIdentificativole4, value: chipIdentificativo, },
                5: { title: Tipodianimale, value: tipoAnimale }
            } = animalComponent.props;

            const {
                0: { title: nomePerson, value: nomePersona, },
                1: { title: Cognome, value: cgnomePersona, },
                2: { title: CodiceFiscale, value: codiceFiscale, },
                3: { title: NumerodiTelefono, value: numerodiTelefono, },
                4: { title: titlNumerodiTelefonoOptional, value: numerodiTelefonoOptionale, },
                5: { title: Email, value: email }
            } = personComponent.props;

            const {
                0: { title: Describtion, value: describtion, },
                1: { title: Tipodisimptome, value: tipodisimptome, },
            } = descriptioComponent.props;


            const fetchPropsAnimal = {
                nomeAnimale,
                dataDiNascita,
                luogoDiNascita,
                luogoDiResodenza,
                chipIdentificativo,
                tipoAnimale: parseInt(tipoAnimale) + 1,
            };

            const fetchPropsPerson = {
                nomePersona,
                cgnomePersona,
                codiceFiscale,
                numerodiTelefono,
                numerodiTelefonoOptionale,
                email
            };

            let diagnosiVisit;
            let priceVisit;
            let idxAnimal;
            let idxPerson;

            if (checkBooleanArray(animalComponent.isValid()) && checkBooleanArray(personComponent.isValid()) && checkBooleanArray(descriptioComponent.isValid())) {
                let statusModalWindow = "confirm";
                const modelWindow = new ModelWindow(wrapper.menagerWrapper, PrenotationModalWindow, statusModalWindow)
                modelWindow.init();

                await UtilFetch.postData('/src/utils/php/insertAnimal.php', fetchPropsAnimal)
                    .then(fetchResponse => {
                        const { status, data } = fetchResponse;

                        idxAnimal = data.new_animal_id;

                        console.log("This is idAnimal" + idxAnimal);

                        if (status >= 200 && status < 300) {

                        } else {

                            console.error(fetchResponse);
                        }
                    });


                await UtilFetch.postData('/src/utils/php/insertPerson.php', fetchPropsPerson)
                    .then(fetchResponse => {
                        const { status, data } = fetchResponse;

                        idxPerson = data.new_person_id;

                        console.log("This is idAnimal" + idxPerson);

                        if (status >= 200 && status < 300) {

                        } else {

                            console.error(fetchResponse);
                        }
                    });

                const fetchPropsDescribtion = {
                    idxPrenotation: getParam(window, 'idx'),
                    idxAnimal,
                    idxPerson,
                    tipodisimptome,
                    describtion,
                    diagnosiVisit,
                    priceVisit,
                };

                await UtilFetch.postData('/src/utils/php/insertDescription.php', fetchPropsDescribtion)
                    .then(fetchResponse => {
                        const { status, data } = fetchResponse;

                        if (status >= 200 && status < 300) {

                        } else {

                            console.error(fetchResponse);
                        }
                    });




                console.log("Funziona");
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
            console.log("Heeko");
            console.log(content);


        };
        const cancelBtn = document.querySelector('.cancel');


        cancelBtn.addEventListener('click', () => {
            location.href = "../index.html";
        });

        wrapper.menagerWrapper.addEventListener('content-data', (e) => { handlerModalContent(e) });
    }

}
if (result === 'user') {
    const animalComponent = new ManageWrapper(wrapper.menagerWrapper, Animal.list, Animal.title);
    animalComponent.init();

    const personComponent = new ManageWrapper(wrapper.menagerWrapper, Person.list, Person.title);
    personComponent.init();


    const descriptioComponent = new DescriptionWrapper(wrapper.menagerWrapper, Description.list, Description.title);
    descriptioComponent.init();

    const prenotationDoctorComponent = new DoctorPrenotationWrapper(wrapper.menagerWrapper, PrenotationDoctor.list);
    prenotationDoctorComponent.init();

    wrapper.menagerWrapper.addEventListener('apply-prenotation', (e) => handlerApply(e));

    const handlerApply = async (e) => {
        e.preventDefault();
        e.stopPropagation();


        const {
            0: { title: Nome, value: nomeAnimale, },
            1: { title: DatadiNascita, value: dataDiNascita, },
            2: { title: LuogodiNascita, value: luogoDiNascita, },
            3: { title: LuogodiResidenza, value: luogoDiResodenza, },
            4: { title: titChipIdentificativole4, value: chipIdentificativo, },
            5: { title: Tipodianimale, value: tipoAnimale }
        } = animalComponent.props;

        const {
            0: { title: nomePerson, value: nomePersona, },
            1: { title: Cognome, value: cgnomePersona, },
            2: { title: CodiceFiscale, value: codiceFiscale, },
            3: { title: NumerodiTelefono, value: numerodiTelefono, },
            4: { title: titlNumerodiTelefonoOptional, value: numerodiTelefonoOptionale, },
            5: { title: Email, value: email }
        } = personComponent.props;

        const {
            0: { title: Describtion, value: describtion, },
            1: { title: Tipodisimptome, value: tipodisimptome, },
        } = descriptioComponent.props;


        const fetchPropsAnimal = {
            nomeAnimale,
            dataDiNascita,
            luogoDiNascita,
            luogoDiResodenza,
            chipIdentificativo,
            tipoAnimale: parseInt(tipoAnimale) + 1,
        };

        const fetchPropsPerson = {
            nomePersona,
            cgnomePersona,
            codiceFiscale,
            numerodiTelefono,
            numerodiTelefonoOptionale,
            email
        };

        let diagnosiVisit;
        let priceVisit;
        let idxAnimal;
        let idxPerson;

        if (checkBooleanArray(animalComponent.isValid()) && checkBooleanArray(personComponent.isValid()) && checkBooleanArray(descriptioComponent.isValid())) {
            let statusModalWindow = "confirm";
            const modelWindow = new ModelWindow(wrapper.menagerWrapper, PrenotationModalWindow, statusModalWindow)
            modelWindow.init();

            await UtilFetch.postData('/src/utils/php/insertAnimal.php', fetchPropsAnimal)
                .then(fetchResponse => {
                    const { status, data } = fetchResponse;

                    idxAnimal = data.new_animal_id;

                    if (status >= 200 && status < 300) {

                    } else {

                        console.error(fetchResponse);
                    }
                });


            await UtilFetch.postData('/src/utils/php/insertPerson.php', fetchPropsPerson)
                .then(fetchResponse => {
                    const { status, data } = fetchResponse;

                    idxPerson = data.new_person_id;

                    if (status >= 200 && status < 300) {

                    } else {

                        console.error(fetchResponse);
                    }
                });

            const fetchPropsDescribtion = {
                idxPrenotation: getParam(window, 'idx'),
                idxAnimal,
                idxPerson,
                tipodisimptome,
                describtion,
                diagnosiVisit,
                priceVisit,
            };

            await UtilFetch.postData('/src/utils/php/insertDescription.php', fetchPropsDescribtion)
                .then(fetchResponse => {
                    const { status, data } = fetchResponse;

                    if (status >= 200 && status < 300) {

                    } else {

                        console.error(fetchResponse);
                    }
                });

            console.log("Funziona");
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
        console.log("Heeko");
        console.log(content);


    };
    const cancelBtn = document.querySelector('.cancel');


    cancelBtn.addEventListener('click', () => {
        location.href = "../index.html";
    });

    wrapper.menagerWrapper.addEventListener('content-data', (e) => { handlerModalContent(e) });
}



function checkBooleanArray(boolArray) {
    let allTrue = true;

    boolArray.forEach(boolValue => {
        if (boolValue === false) {
            allTrue = false;
        }
    });

    return allTrue;
}

function checkPermission() {
    let coockieState;
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        if (cookie.startsWith('permission=')) {
            const key = cookie.substring('permission='.length);

            if (key === 'admin') {
                coockieState = key;
                return coockieState;
            } else if (key === 'user') {
                coockieState = key;
                return coockieState;
            } else if (key === 'doctor') {
                coockieState = key;
                return coockieState;
            } else {
                return 'Sorry, you do not have permission to access this page.';
            }
        }
    }

    // Permission cookie not found
    return 'Sorry, you do not have permission to access this page.';
}

const header = new Header(wrapper.header, props.header);
header.init();