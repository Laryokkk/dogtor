import Header from "../../lib/header/Header.js"
import UtilFetch from "../../utils/util-fetch.js";
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

const initSourceCB = async () => {
    const fetchProps = { permission: 'user' };
    const response = sourceCB;

    await UtilFetch.postData('/src/utils/php/getSourceCB.php', fetchProps)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                const jsonData = JSON.parse(JSON.stringify(data));
                jsonData.forEach(props => {
                    response.sourceRuleList.push({
                        uuid: crypto.randomUUID(),
                        idx: props.idx,
                        permission: fetchProps.permission,
                        className: 'cb-rule',
                        date: {
                            start: new Date(props.time_start_prenotation),
                            end: new Date(props.time_end_prenotation),
                        },
                    });
                });
            } else {
                console.error('Error in getParks fetch!');
                console.error(fetchResponse);
            }
        });

    return response;
};

const handlerApply = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log(animalComponent.props);

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
        0: { title: Tipodisimptome, value: tipodisimptome, },
        1: { title: Describtion, value: describtion, },
    } = descriptioComponent.props;

    const fetchPropsAnimal = {
        nomeAnimale,
        dataDiNascita,
        luogoDiNascita,
        luogoDiResodenza,
        chipIdentificativo,
        tipoAnimale: parseInt(tipoAnimale) +1,
    };

    const fetchPropsPerson = {
        nomePersona,
        cgnomePersona,
        codiceFiscale,
        numerodiTelefono,
        numerodiTelefonoOptionale,
        email
    };

    console.log(fetchPropsAnimal);

    await UtilFetch.postData('/src/utils/php/insertAnimal.php', fetchPropsAnimal)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {

            } else {
                console.error('Error in getParks fetch!');
                console.error(fetchResponse);
            }
        });

    await UtilFetch.postData('/src/utils/php/insertPerson.php', fetchPropsPerson)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {

            } else {
                console.error('Error in getParks fetch!');
                console.error(fetchResponse);
            }
        });


    // console.log(nomeAnimale); // Output: ''
    // console.log(dataDiNascita); // Output: ''
    // console.log(luogoDiNascita); // Output: ''
    // console.log(luogoDiResodenza); // Output: ''    console.log(nomeAnimale); // Output: ''
    // console.log(chipIdentificativo); // Output: ''
    // console.log(tipoAnimale); // Output: ''

    // console.log(nomePersona); // Output: ''
    // console.log(cgnomePersona); // Output: ''
    // console.log(codiceFiscale); // Output: ''
    // console.log(luogoDiResodenza); // Output: ''    console.log(nomeAnimale); // Output: ''
    // console.log(numerodiTelefono); // Output: ''
    // console.log(numerodiTelefonoOptionale); // Output: ''
    // console.log(email); // Output: ''

    // console.log(tipodisimptome); // Output: ''
    // console.log(describtion); // Output: ''




    if (checkBooleanArray(animalComponent.isValid()) && checkBooleanArray(personComponent.isValid()) && checkBooleanArray(descriptioComponent.isValid())) {
        const modelWindow = new ModelWindow(wrapper.menagerWrapper, PrenotationModalWindow)
        modelWindow.init();


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