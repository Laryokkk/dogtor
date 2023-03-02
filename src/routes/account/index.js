import { History } from "/src/helpers/Helper.js";
import HistoryComponent from "/src/lib/history/HistoryComponent.js";
import Header from "/src/lib/header/Header.js";

const wrapper = {
    account: document.querySelector('div.account'),
    history: document.querySelector('div.history'),
    header: document.querySelector('section#header'),
};

const props = {
    header: {},
    history: History,
};

const history = new HistoryComponent(wrapper.history, props.history);
const header = new Header(wrapper.header, props.header);

history.init();
header.init();