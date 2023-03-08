import { History } from "/src/helpers/Helper.js";
import HistoryComponent from "/src/lib/history/HistoryComponent.js";
import Header from "/src/lib/header/Header.js";
import UtilFetch from "../../utils/util-fetch.js";

function getCookie(username) {
    let name = username + "=";
    let spli = document.cookie.split(';');
    for (var j = 0; j < spli.length; j++) {
        let char = spli[j];
        while (char.charAt(0) == ' ') {
            char = char.substring(1);
        }
        if (char.indexOf(name) == 0) {
            return char.substring(name.length, char.length);
        }
    }
    return "";
}

const wrapper = {
    account: document.querySelector('div.account'),
    history: document.querySelector('div.history'),
    header: document.querySelector('section#header'),
};

const props = {
    header: {},
    history: History,
};

const header = new Header(wrapper.header, props.header);
header.init();

let response;
const jsonData = getCookie("login_id");

await UtilFetch.postData('/src/utils/php/getUserPrenotations.php', { google_id: jsonData })
    .then(fetchResponse => {
        const { status, data } = fetchResponse;
        console.log(fetchResponse);
        if (status >= 200 && status < 300) {
            response = JSON.parse(JSON.stringify(data));
        } else {
            console.error(fetchResponse);
        }
    });


response.forEach(props => {
    const today = new Date(props.time_start_prenotation);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formatted = dd + '/' + mm + '/' + yyyy;

    const histProps = {
        idx: props.idx,
        list: [
            {
                title: 'Inizio',
                value: `${new Date(props.time_start_prenotation).getHours()}:${new Date(props.time_start_prenotation).getMinutes()}`,
                className: 'text-accent',
            },
            {
                title: 'Fine',
                value: `${new Date(props.time_end_prenotation).getHours()}:${new Date(props.time_end_prenotation).getMinutes()}`,
                className: 'text-accent',
            },
            {
                title: 'Data',
                value: formatted,
                className: '',
            },
            {
                title: 'Dottore',
                value: props.name,
                className: '',
            }
        ],
    };

    const history = new HistoryComponent(wrapper.history, histProps);
    history.init();
});