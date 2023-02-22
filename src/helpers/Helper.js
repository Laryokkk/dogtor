const validateText = ("text") =>{
    if (text.length === 0) {
        return false;
    }
    if (/[^a-zA-Z\s]/.test(text)) {
        return false;
    }
    return true;
}


const Person = [
    [
        {
            key: crypto.randomUUID(),
            title: 'Nome',
            inputType: 'text',
            value: 'Hello',
            maxLenght: 20,
            className: 'data-entry',
            validate: validateText
        },
        {
            key: crypto.randomUUID(),
            title: 'Cognome',
            inputType: 'text',
            value: '',
            maxLenght: 20,
            className: 'data-entry',
           
        },
        {
            key: crypto.randomUUID(),
            title: 'Codice Fiscale',
            value: '',
            inputType: 'text',
            maxLenght: 16,
            minLenght: 16,
            className: 'data-entry',
           
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
           
        },
        {
            key: crypto.randomUUID(),
            value: '',
            className: 'data-entry',
            title: 'Email',
            maxLenght: 30,
            placeHolder: 'topolino@gmail.com',
            inputType: 'email',
           
        },
    ],
];



const Description = [
    [
        {
            key: crypto.randomUUID(),
            title: 'Descrizione',
            inputType: 'text',
            value: 'Tevfjkbnvfdbjknvfbnjdfvs',
            className: 'data-entry',
           
        },
    ]
];


const Animal = [
    [{
        key: crypto.randomUUID(),
        title: 'Nome',
        value: '',
        maxLenght: 20,
        className: 'data-entry',
        inputType: 'text',
       
    },
    {
        key: crypto.randomUUID(),
        title: 'Data di Nascita',
        value: '21.02.2023',
        className: 'data-entry',
        inputType: 'date',
       
    },
    {
        key: crypto.randomUUID(),
        title: 'Luogo di Nascita',
        value: '',
        maxLenght: 20,
        className: 'data-entry',
        inputType: 'text',
       
    },
    {
        key: crypto.randomUUID(),
        title: 'Luogo di Residenza',
        value: '',
        maxLenght: 20,
        className: 'data-entry',
        inputType: 'text',
       
    },
    {
        key: crypto.randomUUID(),
        title: 'Chip Identificativo',
        value: '',
        maxLenght: 15,
        className: 'data-entry',
        inputType: 'number',
        placeHolder: '123456789123456',
       
    }],
];

const Doctor = [
    [
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
];

const Visit = [
    [
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
    [
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
            value: 'Artur Smirnov',
            inputType: 'text',
           
        },
    ],
    [
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
            value: 'Petro Petrovuch',
            inputType: 'text',
           
        },
    ],
    [
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
            value: 'San Sanych',
            inputType: 'text',
           
        },
    ],
];

const PrenotationDoctor = [
    [
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
            title: 'Doctor',
            value: 'Petro Petrovuch',
            inputType: 'text',
           
        },
    ]
];

export { Person, Animal, Doctor, Visit, Description, PrenotationDoctor };

