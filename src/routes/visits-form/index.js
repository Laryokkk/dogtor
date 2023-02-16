import Header from "../../lib/header/Header.js";
import VisitsContainer from "../../lib/visits-container/visits-container.js";
import { Visit } from "../../helpers/Helper.js";

const wrapper = {
    header: document.querySelector('section#header'),
    visitsContainer: document.querySelector('section.container'),
};

const props = {
    header: {},
};

const header = new Header(wrapper.header, props.header);
header.init();

Visit.forEach(visitProps => {
    const visitComponent = new VisitsContainer(wrapper.visitsContainer, visitProps);
    visitComponent.init();
});


