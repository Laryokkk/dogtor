const validateText = (text) => {
    const textToValidate = text.toString();

    // todo
    // delete all spaces before start

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
    const tenDigitRegex = /^\d{10}$/;
    return tenDigitRegex.test(inputStr);
}


const isNumeric = (inputStr) => {
    const numericRegex = /^\d+$/;
    return numericRegex.test(inputStr);
}

const isValidDate = (dateString) => {
    if (typeof dateString !== 'string') {
        return false;
    }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return false;
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    if (year < 0 || year > 9999 || month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }
    return true;
}


const Person = {
    title: 'Person',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Nome',
            inputType: 'text',
            value: '',
            maxLenght: 20,
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Cognome',
            inputType: 'text',
            value: '',
            maxLenght: 20,
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Codice Fiscale',
            value: 'deniska',
            inputType: 'text',
            maxLenght: 16,
            minLenght: 16,
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Numero di Telefono',
            value: '12345678',
            className: 'data-entry',
            inputType: 'tel',
            maxLenght: 10,
            minLenght: 10,
            placeHolder: '9876543210',
            validate: (value) => { return isValidPhoneNumber(value) },
        },
        {
            key: crypto.randomUUID(),
            title: 'Numero di Telefono',
            value: 'daqe',
            className: 'data-entry',
            inputType: 'tel',
            maxLenght: 10,
            minLenght: 10,
            placeHolder: 'Facoltativo',
            validate: (value) => { return isValidPhoneNumber(value) },
        },
        {
            key: crypto.randomUUID(),
            value: 'topolino@gmail.com',
            className: 'data-entry',
            title: 'Email',
            maxLenght: 30,
            placeHolder: 'topolino@gmail.com',
            inputType: 'email',
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
            inputType: 'text',
            value: '',
            className: 'data-entry',
            validate: (value) => { return validateText(value) },
        },
    ]
};


const Animal = {
    title: 'Animal',
    list: [{
        key: crypto.randomUUID(),
        title: 'Nome',
        value: '',
        maxLenght: 20,
        className: 'data-entry',
        inputType: 'text',
        validate: (value) => { return validateText(value) },
    },
    {
        key: crypto.randomUUID(),
        title: 'Data di Nascita',
        value: '21.02.2023',
        className: 'data-entry',
        inputType: 'date',
        validate: (value) => { return isValidDate(value) },
    },
    {
        key: crypto.randomUUID(),
        title: 'Luogo di Nascita',
        value: '',
        maxLenght: 20,
        className: 'data-entry',
        inputType: 'text',
        validate: (value) => { return validateText(value) },
    },
    {
        key: crypto.randomUUID(),
        title: 'Luogo di Residenza',
        value: '',
        maxLenght: 20,
        className: 'data-entry',
        inputType: 'text',
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
        validate: (value) => { return isNumeric(value) },
    }],
};


const Doctor = {
    title: '',
    list: [
        {
            key: crypto.randomUUID(),
            title: 'Nome',
            value: 'Denys',
            inputType: 'text',

        },
        {
            key: crypto.randomUUID(),
            title: 'Data',
            inputType: 'date',
            value: '12/12/23',

        },
        {
            key: crypto.randomUUID(),
            title: 'Inizio',
            value: '12:12',
            inputType: 'text',

        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            inputType: 'text',

        },
        {
            key: crypto.randomUUID(),
            title: 'Diagnosi',
            value: '',
            inputType: 'text',

        },
        {
            key: crypto.randomUUID(),
            title: 'Nota',
            value: '',
            inputType: 'text',

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

        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            inputType: 'text',
            className: 'text-accent',

        },
        {
            key: crypto.randomUUID(),
            title: 'Data',
            value: '12/10/2023',
            inputType: 'text',

        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: 'Denys Vysotskyy',
            inputType: 'text',

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

        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            className: 'text-accent  data-entry',

        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: 'Petro Petrovuch',
            className: 'data-entry',
        },
    ]
};

export { Person, Animal, Doctor, Visit, Description, PrenotationDoctor };

