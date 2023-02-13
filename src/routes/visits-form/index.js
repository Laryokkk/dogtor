import Header from "../../lib/header/Header.js";
import VisitsContainer from "../../lib/visits-container/visits-container.js";
import { visit } from "../../helpers/Helper.js";

const wrapper = {
    header: document.querySelector('section#header'),
    visitsContainer: document.querySelector('section.container'),
};

const props = {
    header: {},
};

visit.forEach(element => {
    const visitComp = new VisitsContainer(wrapper.visitsContainer, element);
    visitComp.init();
});


const header = new Header(wrapper.header, props.header);
header.init();
