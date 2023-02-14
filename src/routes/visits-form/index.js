import Header from "../../lib/header/Header.js";
import VisitsContainer from "../../lib/visits-container/visits-container.js";
import { visits } from "../../helpers/Helper.js";

const wrapper = {
    header: document.querySelector('section#header'),
    visitsContainer: document.querySelector('section.container'),
};

const props = {
    header: {},
};

visits.forEach(visitProps => {
    const visitComponent = new VisitsContainer(wrapper.visitsContainer, visitProps);
    visitComponent.init();
});


const header = new Header(wrapper.header, props.header);
header.init();
