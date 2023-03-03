import { isValidBirthdayDate } from "../utils/util-date.js";
import UtilFetch from "/src/utils/util-fetch.js";
import { getParam } from "../utils/util-params.js";


console.log("IDX PERSON IS" + getParam(window, 'idx'));


const data = {
    idPermission: 4

};



async function getPrenotationDoctor() {
    const doctorData = {};

    await UtilFetch.postData('/src/utils/php/getPrenotationDoctor.php', data)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                data.forEach(props => {
                    doctorData.time_start_prenotation = props.time_start_prenotation;
                    doctorData.time_end_prenotation = props.time_end_prenotation;
                    doctorData.name = props.name;
                  
                });
            } else {
                console.error('Error in getParks fetch!');
                console.error(fetchResponse);
            }
        });

    return doctorData;
}

async function getDataAnimal() {
    const animalData = {};

    await UtilFetch.postData('/src/utils/php/getAnimalData.php', data)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                data.forEach(props => {
                    animalData.name = props.name_animal;
                    animalData.dataDiNascita = props.birthday_animal;
                    animalData.luogoDiNascita = props.birthday_place_animal;
                    animalData.luogoDiResidenza = props.residenze_place_animal;
                    animalData.chipIdentificativo = props.chip_animal;
                    animalData.typeAnimal = props.idx_type_animal;
                    
                });
            } else {
                console.error('Error in getParks fetch!');
                console.error(fetchResponse);
            }
        });

    return animalData;
}

async function getPersonData() {
    const personlData = {};

    await UtilFetch.postData('/src/utils/php/getPersonData.php', data)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                data.forEach(props => {
                    personlData.name = props.name_person;
                    personlData.lastname_person = props.lastname_person;
                    personlData.codice_fiscale_person = props.codice_fiscale_person;
                    personlData.tel_person = props.tel_person;
                    personlData.tel_2_person = props.tel_2_person;
                    personlData.email_person = props.email_person;
                    
                });
            } else {
                console.error('Error in getParks fetch!');
                console.error(fetchResponse);
            }
        });

    return personlData;
}

async function getDescribtionData() {
    const describtionData = {};

    await UtilFetch.postData('/src/utils/php/getDescribtionData.php', data)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                data.forEach(props => {
                    
                    describtionData.description_visit = props.description_visit;
                    describtionData.idx_symptoms_visit = props.idx_symptoms_visit;
                    console.log(describtionData);
                });
            } else {
                console.error('Error in getParks fetch!');
                console.error(fetchResponse);
            }
        });

    return describtionData;
}

const getStartTime = array => {
    const date = new Date(array.time_start_prenotation);
    const formattedTime = date.toLocaleTimeString('eu-EU', { hour: '2-digit', minute: '2-digit' });
    return formattedTime
}

const getEndtTime = array => {
    const date = new Date(array.time_end_prenotation);
    const formattedTime = date.toLocaleTimeString('eu-EU', { hour: '2-digit', minute: '2-digit' });
    return formattedTime
}

const getNameDoctor = array => {
    return array.name
}

const getDescribtion = array => {
    return array.description_visit
}

const getSiptomi = array => {
    return array.idx_symptoms_visit
}

const getAnimalName = array => {
    return array.name
}

const getAnimalDataDiNascita = array => {
    const date = new Date(array.dataDiNascita);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getAnimalLuogoDiNascita = array => {
    return array.luogoDiNascita
}

const getAnimalLuogoDiResidenza = array => {
    return array.luogoDiResidenza
}

const getAnimalChipIdentificativo = array => {
    return array.chipIdentificativo
}

const getAnimalTypeAnimal = array => {
    return array.typeAnimal
}

const getPersonlTel_person = array => {
    return array.tel_person
}

const getPersonlLastname_person = array => {
    return array.lastname_person
}

const getPersonlCodice_fiscale_person = array => {
    return array.codice_fiscale_person
}

const getPersonlTel_2_person = array => {
    return array.tel_2_person
}

const getPersonlEmail_person = array => {
    return array.email_person
}


async function getAnimalType() {
    const animalTypes = [];

    await UtilFetch.postData('/src/utils/php/getAnimalType.php', {})
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                data.forEach(props => {

                    animalTypes.push(props.type);
                });

            } else {

                console.error(fetchResponse);
            }
        });

    return animalTypes;
}

async function getAnimalSick() {
    const animalTypes = [];

    await UtilFetch.postData('/src/utils/php/getAnimalSick.php', {})
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                data.forEach(props => {

                    animalTypes.push(props.symptom);
                });

            } else {

                console.error(fetchResponse);
            }
        });

    return animalTypes;
}

const validateSelect = selectElement => {
    if (selectElement.selectedIndex === 0) {
        return false;
    }

    return true;
};

const validateText = (text) => {
    const textToValidate = text.toString().replace(/^\s+/, '');

    if (textToValidate.length === 0) {
        return false;
    }

    if (/[^a-zA-Z\s]/.test(textToValidate)) {
        return false;
    }

    return true;
}


const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return false;
    }
    return true;
}

const isValidPhoneNumber = (inputStr) => {
    const phoneRegex = /^(\+?\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

    return phoneRegex.test(inputStr);
}

const isValidPhoneNumberOptional = (inputStr) => {
    if (inputStr === null || inputStr === '' || inputStr === undefined || inputStr.trim() === '') {
        return true;
    }

    const phoneRegex = /^(\+?\d{1,2}\s?)?(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;

    return phoneRegex.test(inputStr);
}

function isNumeric(str) {
    const regex = /^\d{15}$/;
    return regex.test(str);
}

const History = {
    idx: 1,
    list: [
        {
            title: 'Inizio',
            value: '06:00',
            className: 'text-accent',
        },
        {
            title: 'Fine',
            value: '08:00',
            className: 'text-accent',
        },
        {
            title: 'Data',
            value: ' 23/02/2023',
            className: '',
        },
        {
            title: 'Dottore',
            value: 'Massimo Hyilo',
            className: '',
        }
    ],
};

const Person = {
    title: 'Accompagnatore',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Nome',

            inputType: 'text',
            value: getPersonlLastname_person(await getPersonData()),
            maxLenght: 20,
            required: 'required',
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Cognome',
            inputType: 'text',
            value: getPersonlLastname_person(await getPersonData()),
            maxLenght: 20,
            required: 'required',
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Codice Fiscale',
            value: getPersonlCodice_fiscale_person(await getPersonData()),
            inputType: 'text',
            maxLenght: 16,
            minLenght: 16,
            placeHolder: 'RSSMRA70A01H501W',
            required: 'required',
            className: 'data-entry',
            validate: (value) => { return true },
        },
        {
            key: crypto.randomUUID(),
            title: 'Numero di Telefono',
            value: getPersonlTel_person(await getPersonData()),
            className: 'data-entry',
            inputType: 'tel',
            maxLenght: 10,
            minLenght: 10,
            required: 'required',
            placeHolder: '+39 329 467 3745',
            validate: (value) => { return isValidPhoneNumber(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Numero di Telefono',
            value: getPersonlTel_2_person(await getPersonData()),
            className: 'data-entry optional',
            inputType: 'tel',
            maxLenght: 10,
            minLenght: 10,
            required: '',
            placeHolder: 'Facoltativo',
            validate: (value) => { return isValidPhoneNumberOptional(value) },
        },
        {
            key: crypto.randomUUID(),
            value: getPersonlEmail_person(await getPersonData()),
            className: 'data-entry',
            title: 'Email',
            maxLenght: 30,
            placeHolder: 'topolino@gmail.com',
            inputType: 'email',
            required: 'required',
            validate: (value) => { return validateEmail(value) },
        },
    ],
};

const Description = {
    title: 'Description',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Descrizione',
            inputType: 'textarea',
            value: getDescribtion(await getDescribtionData()),
            className: 'data-entry',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Tipo di simptome',
            inputType: 'selector',
            option: await getAnimalSick(),
            value: '',
            className: 'data-entry selectType',
            required: 'required',
            validate: (value) => { return validateSelect(value) },
        },
    ]
};


const Animal = {
    title: 'Animal',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Nome',
            value: getAnimalName(await getDataAnimal()),
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Data di Nascita',
            value: getAnimalDataDiNascita(await getDataAnimal()),
            className: 'data-entry',
            inputType: 'date',
            required: 'required',
            validate: (value) => { return isValidBirthdayDate(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Luogo di Nascita',
            value: getAnimalLuogoDiNascita(await getDataAnimal()),
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Luogo di Residenza',
            value: getAnimalLuogoDiResidenza(await getDataAnimal()),
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Chip Identificativo',
            value: getAnimalChipIdentificativo(await getDataAnimal()),
            maxLenght: 15,
            className: 'data-entry',
            inputType: 'number',
            placeHolder: 'max 15 number',
            required: 'required',
            validate: (value) => { return isNumeric(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Tipo di animale',
            inputType: 'selector',
            value: getAnimalTypeAnimal(await getDataAnimal()),
            option: await getAnimalType(),
            value: '',
            className: 'data-entry selectType',
            required: 'required',
            validate: (value) => { return validateSelect(value) },
        },
    ],
};


const Doctor = {
    title: '',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Nome',
            value: 'Denys',
            inputType: 'text',
            required: 'required',
        },
        {
            key: crypto.randomUUID(),
            title: 'Data',
            inputType: 'date',
            value: '12/12/23',
            required: 'required',
        },
        {
            key: crypto.randomUUID(),
            title: 'Inizio',
            value: '12:12',
            inputType: 'text',
            required: 'required',
        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            inputType: 'text',
            required: 'required',
        },
        {
            key: crypto.randomUUID(),
            title: 'Diagnosi',
            value: '',
            inputType: 'text',
            required: 'required',
        },
        {
            key: crypto.randomUUID(),
            title: 'Nota',
            value: '',
            inputType: 'text',
            required: 'required',
        }
    ]
};

const Visit = {
    title: '',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Inizio',
            value: '12:12',
            inputType: 'text',
            className: 'text-accent',
            required: '',
        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            inputType: 'text',
            className: 'text-accent',
            required: '',
        },
        {
            key: crypto.randomUUID(),
            title: 'Data',
            value: '12/10/2023',
            inputType: 'text',
            required: '',
        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: 'Denys Vysotskyy',
            inputType: 'text',
            required: '',
        },
    ],
};

const PrenotationDoctor = {
    title: '',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Inizio',
            value: getStartTime(await getPrenotationDoctor()),
            className: 'text-accent data-entry data-output',
            inputType: 'prenotationDoctor',
            required: '',
        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: getEndtTime(await getPrenotationDoctor()),
            className: 'text-accent  data-entry data-output',
            inputType: 'prenotationDoctor',
            required: '',
        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: getNameDoctor(await getPrenotationDoctor()),
            className: 'data-entry data-output',
            inputType: 'prenotationDoctor',
            required: '',
        },
    ]
};

const descibtionDoctor = {
    title: 'Descrizione',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Descrizione',
            inputType: 'textarea',
            value: getDescribtion(await getDescribtionData()),
            className: 'data-entry',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
    ]
};

const priceDoctor = {
    title: 'Prezzo',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Prezzo',
            inputType: 'number',
            value: getDescribtion(await getDescribtionData()),
            className: 'data-entry',
            required: 'required',
            validate: (value) => { return isValidPhoneNumber(value) },
        },
    ]
};

const conclusionnDoctor = {
    title: 'Dottore',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Diagnosi',
            inputType: 'textarea',
            value: getDescribtion(await getDescribtionData()),
            className: 'data-entry',
            classNameSecond: 'conclusionnDoctor',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Nota',
            inputType: 'textarea',
            value: getDescribtion(await getDescribtionData()),
            className: 'data-entry',
            classNameSecond: 'conclusionnDoctor',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
    ]
};



const PrenotationModalWindow = {
    title: '',
    modalType: 'confirm',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Date',
            value: '27/04/2024',
            className: 'prenotation-data',
        },
        {
            key: crypto.randomUUID(),
            title: 'WhichTime',
            value: 'alle',
            className: 'prenotation-data',
        },
        {
            key: crypto.randomUUID(),
            title: 'Time',
            value: '15:00',
            className: 'prenotation-data',
        },
    ]
}

const CancelModalWindow = {
    title: '',
    modalType: 'cancel',
    list: [
    ],
}
// {
//     idx: crypto.randomUUID(),
//     permission: 'user',
//     className: 'cb-rule',
//     date: {
//         start: new Date().setHours(new Date().getHours() - 6),
//         end: new Date().setHours(new Date().getHours() - 4),
//     },
// },

const sourceCB = {
    sourceName: 'Dogtor',
    sourceRuleList: [],
};

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
                        status: props.idx_status,
                        permission: fetchProps.permission,
                        className: 'cb-rule',
                        date: {
                            start: new Date(props.time_start_prenotation),
                            end: new Date(props.time_end_prenotation),
                        },
                    });
                });
            } else {

                console.error(fetchResponse);
            }
        });

    return response;
};

export { Person, Animal, Doctor, Visit, Description, PrenotationDoctor, PrenotationModalWindow, CancelModalWindow, initSourceCB, History ,descibtionDoctor,conclusionnDoctor,priceDoctor};

