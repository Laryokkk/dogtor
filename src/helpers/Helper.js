
function validateInput(value) {
    return value ? true : false;
}

const Person = [
    {
        key: crypto.randomUUID(),
        title: 'Nome',
        inputType: 'text',
        value: 'Hello',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Cognome',
        inputType: 'date',
        value: '',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Codice Fiscale',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Numero di Telefono',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Email',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Descrizione',
        inputType: 'text',
        validate: validateInput(),
    },
];

const Animal = [
    {
        key: crypto.randomUUID(),
        title: 'Nome',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Data di Nascita',
        inputType: 'date',
        value: '',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Luogo di Nascita',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Luogo di Residenza',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Chip Identificativo',
        inputType: 'text',
        validate: validateInput(),
    },
];

const Doctor = [
    {
        key: crypto.randomUUID(),
        title: 'Nome',
        value: 'Denys',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Data',
        inputType: 'date',
        value: '12/12/23',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Inizio',
        value: '12:12',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Fine',
        value: '12:13',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Diagnosi',
        value: '',
        inputType: 'text',
        validate: validateInput(),
    },
    {
        key: crypto.randomUUID(),
        title: 'Nota',
        value: '',
        inputType: 'text',
        validate: validateInput(),
    },
];

const Visit = [
    [
        {
            key: crypto.randomUUID(),
            title: 'Inizio',
            value: '12:12',
            inputType: 'text',
            className: 'text-accent',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            inputType: 'text',
            className: 'text-accent',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Data',
            value: '12/10/2023',
            inputType: 'text',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: 'Denys Vysotskyy',
            inputType: 'text',
            validate: validateInput(),
        },
    ],
    [
        {
            key: crypto.randomUUID(),
            title: 'Inizio',
            value: '12:12',
            inputType: 'text',
            className: 'text-accent',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            inputType: 'text',
            className: 'text-accent',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Data',
            value: '12/10/2023',
            inputType: 'text',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: 'Artur Smirnov',
            inputType: 'text',
            validate: validateInput(),
        },
    ],
    [
        {
            key: crypto.randomUUID(),
            title: 'Inizio',
            value: '12:12',
            inputType: 'text',
            className: 'text-accent',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            inputType: 'text',
            className: 'text-accent',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Data',
            value: '12/10/2023',
            inputType: 'text',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: 'Petro Petrovuch',
            inputType: 'text',
            validate: validateInput(),
        },
    ],
    [
        {
            key: crypto.randomUUID(),
            title: 'Inizio',
            value: '12:12',
            inputType: 'text',
            className: 'text-accent',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Fine',
            value: '12:13',
            inputType: 'text',
            className: 'text-accent',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Data',
            value: '12/10/2023',
            inputType: 'text',
            validate: validateInput(),
        },
        {
            key: crypto.randomUUID(),
            title: 'Doctor',
            value: 'San Sanych',
            inputType: 'text',
            validate: validateInput(),
        },
    ],
];

export { Person, Animal, Doctor, Visit };

