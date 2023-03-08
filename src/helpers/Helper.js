import { isValidBirthdayDate } from "../utils/util-date.js";
import UtilFetch from "/src/utils/util-fetch.js";
import { getParam } from "../utils/util-params.js";

const data = {
    idPermission: getParam(window, "idx")
};

async function getPrenotationData() {
    const prenotationData = {};

    await UtilFetch.postData('/src/utils/php/getPrenotationData.php', data)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                
                data.forEach(props => {
                    prenotationData.birthday_animal = props.birthday_animal;
                    prenotationData.birthday_place_animal = props.birthday_place_animal;
                    prenotationData.chip_animal = props.chip_animal;
                    prenotationData.codice_fiscale_person = props.codice_fiscale_person;
                    prenotationData.description_visit = props.description_visit;
                    prenotationData.email_person = props.email_person;
                    prenotationData.idx_symptoms_visit = props.idx_symptoms_visit;
                    prenotationData.idx_type_animal = props.idx_type_animal;
                    prenotationData.lastname_person = props.lastname_person;
                    prenotationData.name_animal = props.name_animal;
                    prenotationData.name_person = props.name_person;
                    prenotationData.residenze_place_animal = props.residenze_place_animal;
                    prenotationData.tel_2_person = props.tel_2_person;
                    prenotationData.price_visit = props.price_visit;
                    prenotationData.note_visit = props.note_visit;
                    prenotationData.diagnosis_visit = props.diagnosis_visit;
                    prenotationData.tel_person = props.tel_person;
                });
            } else {
                console.error('Error in getParks fetch!');
                console.error(fetchResponse);
            }
        });
    return prenotationData;
}

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

async function getDescribtionData() {
    const describtionData = {};

    await UtilFetch.postData('/src/utils/php/getDescribtionData.php', data)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                data.forEach(props => {
                    describtionData.description_visit = props.description_visit;
                    describtionData.idx_symptoms_visit = props.idx_symptoms_visit;
                });
            } else {
                console.error('Error in getParks fetch!');
                console.error(fetchResponse);
            }
        });

    return describtionData;
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

const getPrice_visit = array => {
    return array.price_visit
}
const getNote_visit = array => {
    return array.note_visit
}
const getDiagnosis_visit = array => {
    return array.diagnosis_visit
}

const getDescribtion = array => {
    return array.description_visit
}

const getSiptomi = array => {
    return array.idx_symptoms_visit
}


const getAnimalName = array => {
    return array.name_animal
}

const getAnimalDataDiNascita = array => {
    const date = new Date(array.birthday_animal);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const getAnimalLuogoDiNascita = array => {
    return array.birthday_place_animal
}

const getPersonName_person = array => {
    return array.name_person
}
const getAnimalLuogoDiResidenza = array => {
    return array.residenze_place_animal
}

const getAnimalChipIdentificativo = array => {
    return array.chip_animal
}

const getAnimalTypeAnimal = array => {
    return array.idx_type_animal
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


const validateSelect = selectElement => {
    if (selectElement.selectedIndex === 0) {
        return false;
    }

    return true;
};

function validateNumberInput(input) {
    const regex = /^[0-9]+$/;
    return regex.test(input);
  }

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

function formatDateWithoutTime(dateTimeString) {
    const date = new Date(dateTimeString.time_end_prenotation);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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



const PersonGetData={
    title: 'Accompagnatore',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Nome',
            inputType: 'text',
            value: getPersonName_person(await getPrenotationData()),
            maxLenght: 20,
            required: 'required',
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Cognome',
            inputType: 'text',
            value: getPersonlLastname_person(await getPrenotationData()),
            maxLenght: 20,
            required: 'required',
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Codice Fiscale',
            value: getPersonlCodice_fiscale_person(await getPrenotationData()),
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
            value: getPersonlTel_person(await getPrenotationData()),
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
            value: getPersonlTel_2_person(await getPrenotationData()),
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
            value: getPersonlEmail_person(await getPrenotationData()),
            className: 'data-entry',
            title: 'Email',
            maxLenght: 30,
            placeHolder: 'topolino@gmail.com',
            inputType: 'email',
            required: 'required',
            validate: (value) => { return validateEmail(value) },
        },
    ],
}

const DescriptionGetData = {
    title: 'Description',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Descrizione',
            inputType: 'textarea',
            value: getDescribtion(await getPrenotationData()) ,
            className: 'data-entry',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Tipo di simptome',
            inputType: 'selector',
            option: await getAnimalSick(),
            value:getSiptomi(await getPrenotationData()),
            className: 'data-entry selectType',
            required: 'required',
            validate: (value) => { return validateSelect(value) },
        },
    ]
};

const AnimalGetData = {
    title: 'Animal',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Nome',
            value: getAnimalName(await getPrenotationData()),
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Data di Nascita',
            value: getAnimalDataDiNascita(await getPrenotationData()),
            className: 'data-entry',
            inputType: 'date',
            required: 'required',
            validate: (value) => { return isValidBirthdayDate(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Luogo di Nascita',
            value: getAnimalLuogoDiNascita(await getPrenotationData()),
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Luogo di Residenza',
            value: getAnimalLuogoDiResidenza(await getPrenotationData()),
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Chip Identificativo',
            value: getAnimalChipIdentificativo(await getPrenotationData()),
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
            value: getAnimalTypeAnimal(await getPrenotationData()),
            option: await getAnimalType(),
            className: 'data-entry selectType',
            required: 'required',
            validate: (value) => { return validateSelect(value) },
        },
    ],
};


const Person = {
    title: 'Accompagnatore',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Nome',
            inputType: 'text',
            value:'',
            maxLenght: 20,
            required: 'required',
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Cognome',
            inputType: 'text',
            value: '',
            maxLenght: 20,
            required: 'required',
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Codice Fiscale',
            value: '',
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
            value: '',
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
            value: '',
            className: 'data-entry optional',
            inputType: 'tel',
            maxLenght: 10,
            minLenght: 10,
            required: '',
            placeHolder: 'Facoltativo',
            validate: (value) => { return true },
        },
        {
            key: crypto.randomUUID(),
            value:'',
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
            value: '',///* getDescribtion(await getDescribtionData()) */
            className: 'data-entry',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Tipo di simptome',
            inputType: 'selector',
            option: await getAnimalSick(),
            value:'',// getSiptomi(await getDescribtionData())
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
            value: '',//getAnimalName(await getDataAnimal())
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Data di Nascita',
            value: '',//getAnimalDataDiNascita(await getDataAnimal())
            className: 'data-entry',
            inputType: 'date',
            required: 'required',
            validate: (value) => { return isValidBirthdayDate(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Luogo di Nascita',
            value: '',//getAnimalLuogoDiNascita(await getDataAnimal())
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Luogo di Residenza',
            value: '',//getAnimalLuogoDiResidenza(await getDataAnimal())
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Chip Identificativo',
            value: '',//getAnimalChipIdentificativo(await getDataAnimal())
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
            value: '',//getAnimalTypeAnimal(await getDataAnimal())
            option: await getAnimalType(),
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
            value: '',
            className: 'data-entry data-doctor',
            classNameSecond: 'conclusionnDoctor',
            required: 'required',
            validate: (value) => { return validateNumberInput(value) },
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
            value: '',
            className: 'data-entry data-doctor',
            classNameSecond: 'conclusionnDoctor',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Nota',
            inputType: 'textarea',
            value: '',
            className: 'data-entry data-doctor',
            classNameSecond: 'conclusionnDoctor',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
    ]
};

const priceDoctorHistory = {
    title: 'Prezzo',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Prezzo',
            inputType: 'number',
            value: getPrice_visit(await getPrenotationData()),
            className: 'data-entry data-doctor',
            classNameSecond: 'conclusionnDoctor',
            required: 'required',
            validate: (value) => { return true },
        },
    ]
};

priceDoctorHistory.list.forEach(el=>{
})

const conclusionnDoctorHystory = {
    title: 'Dottore',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Diagnosi',
            inputType: 'textarea',
            value: getDiagnosis_visit(await getPrenotationData()),
            className: 'data-entry data-doctor',
            classNameSecond: 'conclusionnDoctor',
            required: 'required',
            validate: (value) => { return true },
        },
        {
            key: crypto.randomUUID(),
            title: 'Nota',
            inputType: 'textarea',
            value: getNote_visit(await getPrenotationData()),
            className: 'data-entry data-doctor',
            classNameSecond: 'conclusionnDoctor',
            required: 'required',
            validate: (value) => { return true },
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
            value: formatDateWithoutTime(await getPrenotationDoctor()),
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
            value: getStartTime(await getPrenotationDoctor()),
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

export { Person, Animal, Doctor, Visit, Description, PrenotationDoctor, PrenotationModalWindow, CancelModalWindow, initSourceCB, History, descibtionDoctor, conclusionnDoctor, priceDoctor,PersonGetData ,AnimalGetData,DescriptionGetData,priceDoctorHistory,conclusionnDoctorHystory};

