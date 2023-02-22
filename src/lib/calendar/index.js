import { formatDate, getCurrentFirstDay, getCurrentLastDay } from '/src/utils/util-date.js';

class CalendarBox {
    constructor(parentElement, ...props) {
        this.parentElement = parentElement;
        this.rootElement;

        this.props = {
            ...props,
        };

        this.template;
        this.elements = {};
        this.eventHandlers = [];
    }

    init() {
        this.initElements();
        this.initEventListeners();
        this.render();
    }

    render() {
        this.parentElement.appendChild(this.rootElement);
    }

    refresh() {

    }

    destroy() {

    }

    initElements() {
        this.initTemplate();
        this.rootElement = this.template;

        this.elements = {
            heading: {
                chevronLeftBtn: this.rootElement.querySelector('button.cb-heading-zmdi-chevron-left'),
                chevronsLeftBtn: this.rootElement.querySelector('button.cb-heading-zmdi-chevrons-left'),
                dateStr: this.rootElement.querySelector('.cb-heading-date-text'),
                chevronRightBtn: this.rootElement.querySelector('button.cb-heading-zmdi-chevron-right'),
                chevronsRightBtn: this.rootElement.querySelector('button.cb-heading-zmdi-chevrons-right'),
            },
        };

        this.initHeadingDate();
    }

    initEventListeners() {
        const { heading } = this.elements;

        heading.chevronLeftBtn.addEventListener('click', (e) => this.handlerChevronLeft(e));
        heading.chevronsLeftBtn.addEventListener('click', (e) => this.handlerChevronsLeft(e));
        heading.chevronRightBtn.addEventListener('click', (e) => this.handlerChevronRight(e));
        heading.chevronsRightBtn.addEventListener('click', (e) => this.handlerChevronsRight(e));
    }

    handlerChevronLeft(e) {
        e.preventDefault();

        console.log('handlerChevronLeft');
    }

    handlerChevronsLeft(e) {
        e.preventDefault();

        console.log('handlerChevronsLeft');
    }

    handlerChevronRight(e) {
        e.preventDefault();

        console.log('handlerChevronRight');
    }

    handlerChevronsRight(e) {
        e.preventDefault();

        console.log('handlerChevronsRight');
    }

    initHeadingDate() {
        const { heading } = this.elements;

        const currentFirstDay = getCurrentFirstDay();
        const currentLastDay = getCurrentLastDay();
        const date = formatDate(new Date(currentFirstDay), new Date(currentLastDay));

        heading.dateStr.innerHTML = date.toString();
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateStr = `
            <section class="cb">
                <div class="cb-heading">
                    ${this.initTemplateHeading()}
                </div>
                <div class="cb-calendar">
                    ${this.initTemplateCalendar()}
                </div>
            </section>
        `;
        const templateEl = parser.parseFromString(templateStr, 'text/html');
        this.template = templateEl.documentElement.querySelector('body > section');
    }

    initTemplateHeading() {
        return `
            <div class="cb-heading-move">
                <button class="cb-heading-zmdi cb-heading-zmdi-chevron-left active">
                    <span class="cb-zmdi cb-zmdi-chevron-left"></span>
                </button>
                <button class="cb-heading-zmdi cb-heading-zmdi-chevrons-left active">
                    <span class="cb-zmdi cb-zmdi-chevrons-left"></span>
                </button>
            </div>
            <div class="cb-heading-date">
                <h5 class="text cb-text cb-heading-date-text"></h5>
            </div>
            <div class="cb-heading-move">
                <button class="cb-heading-zmdi cb-heading-zmdi-chevrons-right active">
                    <span class="cb-zmdi cb-zmdi-chevrons-right"></span>
                </button>
                <button class="cb-heading-zmdi cb-heading-zmdi-chevron-right active">
                    <span class="cb-zmdi cb-zmdi-chevron-right"></span>
                </button>
            </div>
        `;
    }

    initTemplateCalendar() {
        return `
            ${this.initTemplateTime()}
            <table>
                <tbody>
                    ${this.initTemplateTr()}
                </tbody>
            </table>
        `;
    }

    initTemplateTime() {
        return `
            <div class="cb-time">
                <h5 class="text cb-text cb-text-time">
                    03:00
                </h5>
                <h4 class="text cb-text cb-text-time">
                    06:00
                </h4>
                <h5 class="text cb-text cb-text-time">
                    09:00
                </h5>
                <h3 class="text cb-text cb-text-time">
                    12:00
                </h3>
                <h5 class="text cb-text cb-text-time">
                    15:00
                </h5>
                <h4 class="text cb-text cb-text-time">
                    18:00
                </h4>
                <h5 class="text cb-text cb-text-time">
                    21:00
                </h5> 
            </div>
        `;
    }

    initTemplateTr() {
        const templateStr = `
            <tr class="cb-tr">
                <th class="cb-th">
                    <div class="cb-container-rule"></div>
                </th>
                <th class="cb-th">
                    <div class="cb-container-rule"></div>
                </th>
                <th class="cb-th">
                    <div class="cb-container-rule"></div>
                </th>
                <th class="cb-th">
                    <div class="cb-container-rule"></div>
                </th>
                <th class="cb-th">
                    <div class="cb-container-rule"></div>
                </th>
                <th class="cb-th">
                    <div class="cb-container-rule"></div>
                </th>
                <th class="cb-th">
                    <div class="cb-container-rule"></div>
                </th>
            </tr>
        `;

        let response = '';

        for (let idx = 0; idx < 8; idx++) {
            response += templateStr;
        }

        return response;
    }
}

export default CalendarBox;