import Header from "../../lib/header/Header.js";
import VisitsBlock from "../../lib/visits-block/visits-block.js";

const wrapper = {
    header: document.querySelector('section#header'),
    visitsBlock :document.querySelector('section.container'),
};

console.log(wrapper.visitsBlock);

const props = {
    header: {},
    visitsBlock: {},
};

const header = new Header(wrapper.header, props.header);
const visitsBlock = new VisitsBlock (wrapper.visitsBlock, props.visitsBlock);
console.log(visitsBlock);
console.log(header);
visitsBlock.init();
visitsBlock.init();
visitsBlock.init();
visitsBlock.init();
visitsBlock.init();
visitsBlock.init();
visitsBlock.init();
visitsBlock.init();
visitsBlock.init();

header.init();
