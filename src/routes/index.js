import Header from "../lib/header/Header.js";

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

const permission = getCookie('permission');

if (permission && permission !== 'user') {
    window.location.href = `/src/routes/calendar/index.html`;
}

const wrapper = {
    header: document.querySelector('section#header'),
};

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);
header.init();