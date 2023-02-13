import Header from "../../lib/header/Header.js";

const wrapper = {
    header: document.querySelector('section#header'),
};

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);
header.init();



const data = {
    animal: {
        nome: {
            value: "Hello world",
        },
        dataDiNamscita: {
            value: "Hello world",
        },
        luogoDiNascita: {
            value: "Hello world",
        },
        luogoDiResidenza: {
            value: "Hello world",
        },
        chipIdentificativo: {
            value: "Hello world",
        }
    },
    person: {
        nome: {
            value: "",
        },
        cognome: {
            value: "",
        },
        codiceFiscale: {
            value: "",
        },
        numeroDiTelefonoMain: {
            value: "",
        },
        numeroDiTelefonoSecondary: {
            value: "",
        },
        email: {
            value: "",
        }
    },
    dottore: {
        data: {
            value: "",
        },
        timeStart: {
            value: "",
        },
        timeEnd: {
            value: "",
        },
        diagnosi: {
            value: "",
        },
        prezzo: {
            value: "",
        },
        nota: {
            value: "",
        },
    },
    nota: {
        descrizione: {

        }
    }
}