import { isValidDate } from "../utils/util-date.js";
import UtilFetch from "/src/utils/util-fetch.js";

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


const Person = {
    title: 'Accompagnatore',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Nome',

            inputType: 'text',
            value: '',
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
            validate: (value) => { return validateText(value) },
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
            value: 'null',
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
            value: '',
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
            value: '',
            className: 'data-entry',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Tipo di simptome',
            inputType: 'selector',
            option: ['Cancer', 'coronavirus', 'non sa fare use case', 'non sa fare integrale |x dx'],
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

            value: '',
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Data di Nascita',

            value: '',
            className: 'data-entry',
            inputType: 'date',
            required: 'required',
            validate: (value) => { return isValidDate(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Luogo di Nascita',

            value: '',
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Luogo di Residenza',

            value: '',
            maxLenght: 20,
            className: 'data-entry',
            inputType: 'text',
            required: 'required',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Chip Identificativo',
            value: '',
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
            option: ['Cane', 'gato', 'pussy in boots'],
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
            value: '12:12',
            className: 'text-accent data-entry data-output',
            inputType: 'prenotationDoctor',
            required: '',
        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            className: 'text-accent  data-entry data-output',
            inputType: 'prenotationDoctor',
            required: '',
        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: 'Petro Petrovuch',
            className: 'data-entry data-output',
            inputType: 'prenotationDoctor',
            required: '',
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

export { Person, Animal, Doctor, Visit, Description, PrenotationDoctor, PrenotationModalWindow, CancelModalWindow, initSourceCB };

