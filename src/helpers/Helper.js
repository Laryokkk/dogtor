import { isValidDate } from "../utils/util-date.js";

const validateCodiceFiscale = (str) => {
    const regex = /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/i;
    if (!regex.test(str)) {
      return false;
    }
  
    const validSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const validPosition = [
      1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10,
    ];
  
    let sum = 0;
    for (let i = 0; i < 15; i++) {
      const c = str.charAt(i);
      const v = validSet.indexOf(c);
      const p = validPosition[i];
      const digit = v * (p % 2 + 1);
      sum += digit < 10 ? digit : digit - 9;
    }
  
    const checkDigit = validSet.charAt((10 - (sum % 10)) % 10);
    return str.charAt(15).toUpperCase() === checkDigit;
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

const isOptions = (inputStr) => {
    return true;
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
            validate: (value) => { return validateCodiceFiscale(value) },
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
            className: 'data-entry',
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
            option: ['Cane', 'Gatto', 'lexsus'],
            value: '',
            className: 'data-entry',
            required: 'required',
            validate: (value) => { return isOptions(value) },
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
            placeHolder: '123456789123456',
            required: 'required',
            validate: (value) => { return isNumeric(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Tipo di animale',
            inputType: 'selector',
            option: ['Cancer', 'coronavirus', 'bahchisarai'],
            value: '',
            className: 'data-entry',
            required: 'required',
            validate: (value) => { return isOptions(value) },
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
            className: 'text-accent data-entry',
            inputType: 'prenotationDoctor',
            required: '',
        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            className: 'text-accent  data-entry',
            inputType: 'prenotationDoctor',
            required: '',
        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: 'Petro Petrovuch',
            className: 'data-entry',
            inputType: 'prenotationDoctor',
            required: '',
        },
    ]
};

const PrenotationModalWindow = {
    title: '',
    list: [
        {
            key: crypto.randomUUID(),
            title: '',
            value: '23/01/2023',
            className: 'text-accent data-entry',
        },
        {
            key: crypto.randomUUID(),
            title: 'alle',
            value: '15:00',
            className: 'text-accent data-entry',
        }
    ]
}

export { Person, Animal, Doctor, Visit, Description, PrenotationDoctor, PrenotationModalWindow, };

