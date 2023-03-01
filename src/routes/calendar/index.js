import CalendarBox from '/src/lib/calendar/index.js';
import { initSourceCB } from '/src/helpers/Helper.js';
import Header from "/src/lib/header/Header.js";

const wrapper = {
    header: document.querySelector('section#header'),
    calendar: document.querySelector('.container'),
};

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);
header.init();

const calendarProps = await initSourceCB();
const cb = new CalendarBox(wrapper.calendar, calendarProps);
cb.init();

const handlerRule = (e) => {
    const { ruleIdx } = e.detail;

    window.location.href = `/src/routes/manage-data/index.html?idx=${ruleIdx}`;
};

wrapper.calendar.addEventListener('handlerRule', (e) => { handlerRule(e) });