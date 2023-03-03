import Header from "/src/lib/header/Header.js";
import UtilFetch from "../../utils/util-fetch.js";

const wrapper = {
    container: document.querySelector('section.container'),
    header: document.querySelector('section#header'),
    selector: document.querySelector('select'),
    button: document.querySelector('button'),
    start: document.querySelector('[name=time-start]'),
    end: document.querySelector('[name=time-end]'),
};

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);

header.init();

const fetchProps = {};

let jsonData;
await UtilFetch.postData('/src/utils/php/getDoctors.php', fetchProps)
    .then(fetchResponse => {
        const { status, data } = fetchResponse;

        if (status >= 200 && status < 300) {
            jsonData = JSON.parse(JSON.stringify(data));
        } else {
            console.error(fetchResponse);
        }
    });

jsonData.forEach(element => {
    wrapper.selector.innerHTML += `<option value="${element.id}">${element.name}</option>`
});

wrapper.button.addEventListener('click', (e) => {
    const data = {
        idxDoctor: wrapper.selector.value,
        idxUser: null,
        idxPermissions: 3,
        idxStatus: 1,
        timeStart: wrapper.start.value,
        timeEnd: wrapper.end.value,
    };

    UtilFetch.postData('/src/utils/php/insertVisitEvent.php', data)
        .then(fetchResponse => {
            const { status, data } = fetchResponse;

            if (status >= 200 && status < 300) {
                jsonData = JSON.parse(JSON.stringify(data));
            } else {
                console.error(fetchResponse);
            }
        });
});