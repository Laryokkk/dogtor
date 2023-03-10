import { formatDate, getCurrentFirstDay, getCurrentLastDay } from '/classi/5e/vysotskyy/src/utils/util-date.js';

function calculateTopAndHeight(eventStartTime, eventEndTime, parentHeight) {
    const relativeDate = new Date(eventStartTime);
    relativeDate.setHours(0);
    relativeDate.setMinutes(0);
    relativeDate.setSeconds(0);

    const startOfDay = new Date(relativeDate).setHours(6, 0, 0, 0);
    const endOfDay = new Date(relativeDate).setHours(17, 0, 0, 0);
    const eventStart = new Date(eventStartTime).getTime();
    const eventEnd = new Date(eventEndTime).getTime();

    if (new Date(eventStartTime).getHours() < 6 || new Date(eventStartTime).getHours() > 17) {
        return {};
    }

    const totalDayTime = endOfDay - startOfDay;
    const eventDuration = eventEnd - eventStart;
    const eventStartRelativeToDay = eventStart - startOfDay;
    // const eventEndRelativeToDay = eventEnd - startOfDay;

    const top = (eventStartRelativeToDay / totalDayTime) * (parentHeight);
    const height = (eventDuration / totalDayTime) * (parentHeight);

    return { top: `${top}px`, height: `${height}px` };
}

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

class CalendarBox {
    constructor(parentElement, source, ...props) {
        this.parentElement = parentElement;
        this.rootElement;

        this.props = {
            timeGridValues: ['07:00', '08:30', '10:00', '11:30', '13:00', '14:30', '16:00'],
            ...props, // error
        };

        this.template;
        this.elements = {};
        this.eventHandlers = [];

        this.source = source;
        this.activeSource = JSON.parse(JSON.stringify(this.source));
        this.timeRange = { start: getCurrentFirstDay(), end: getCurrentLastDay() }
    }

    init() {
        this.initActiveSource();
        this.initElements();
        this.initEventListeners();
        this.render();
    }

    render() {
        this.parentElement.appendChild(this.rootElement);
        this.renderSource();
    }

    refresh() {
        while (this.template.firstChild) {
            this.template.removeChild(this.template.lastChild);
        }

        this.initActiveSource();
        this.initElements();
        this.initEventListeners();
        this.render();
    }

    destroy() {

    }

    initElements() {
        this.initTemplate();
        this.rootElement = this.template;

        this.elements = {
            heading: {
                chevronLeftBtn: this.rootElement.querySelector('button.cb-heading-zmdi-chevron-left'),
                dateStr: this.rootElement.querySelector('.cb-heading-date-text'),
                chevronRightBtn: this.rootElement.querySelector('button.cb-heading-zmdi-chevron-right'),
            },
            timeGrid: {
                time0: this.rootElement.querySelector('#cb-text-time-0'),
                time1: this.rootElement.querySelector('#cb-text-time-1'),
                time2: this.rootElement.querySelector('#cb-text-time-2'),
                time3: this.rootElement.querySelector('#cb-text-time-3'),
                time4: this.rootElement.querySelector('#cb-text-time-4'),
                time5: this.rootElement.querySelector('#cb-text-time-5'),
                time6: this.rootElement.querySelector('#cb-text-time-6'),
            },
            calendar: {
                table: this.rootElement.querySelector('table'),
                ruleContainer1: this.rootElement.querySelector('.cb-container-rule-position-1'),
                ruleContainer2: this.rootElement.querySelector('.cb-container-rule-position-2'),
                ruleContainer3: this.rootElement.querySelector('.cb-container-rule-position-3'),
                ruleContainer4: this.rootElement.querySelector('.cb-container-rule-position-4'),
                ruleContainer5: this.rootElement.querySelector('.cb-container-rule-position-5'),
            },
        };

        this.initHeadingDate();
        this.intiTimeGrid();
    }

    initEventListeners() {
        const { heading } = this.elements;

        heading.chevronLeftBtn.addEventListener('click', (e) => this.handlerChevronLeft(e));
        heading.chevronRightBtn.addEventListener('click', (e) => this.handlerChevronRight(e));
    }

    handlerChevronLeft(e) {
        e.preventDefault();
        const start = new Date(new Date(this.timeRange.start).getTime() - 604800000);
        const end = new Date(new Date(this.timeRange.end).getTime() - 604800000);

        this.timeRange = { start, end };

        this.refresh();
    }

    handlerChevronRight(e) {
        e.preventDefault();
        const start = new Date(new Date(this.timeRange.start).getTime() + 604800000);
        const end = new Date(new Date(this.timeRange.end).getTime() + 604800000);

        this.timeRange = { start, end };

        this.refresh();
    }

    initHeadingDate() {
        const { heading } = this.elements;

        const currentFirstDay = this.timeRange.start;
        const currentLastDay = this.timeRange.end;
        const date = formatDate(new Date(currentFirstDay), new Date(currentLastDay));

        heading.dateStr.innerHTML = date.toString();
    }

    intiTimeGrid() {
        const { timeGrid } = this.elements;
        const listTimeEl = Object.values(timeGrid);

        listTimeEl.forEach((el, idx) => {
            el.innerHTML = this.props.timeGridValues[idx];
        });
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
            </div>
            <div class="cb-heading-date">
                <h5 class="text cb-text cb-heading-date-text"></h5>
            </div>
            <div class="cb-heading-move">
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
                <h5 id="cb-text-time-0" class="text cb-text cb-text-time"></h5>
                <h4 id="cb-text-time-1" class="text cb-text cb-text-time"></h4>
                <h5 id="cb-text-time-2" class="text cb-text cb-text-time"></h5>
                <h3 id="cb-text-time-3" class="text cb-text cb-text-time"></h3>
                <h5 id="cb-text-time-4" class="text cb-text cb-text-time"></h5>
                <h4 id="cb-text-time-5" class="text cb-text cb-text-time"></h4>
                <h5 id="cb-text-time-6" class="text cb-text cb-text-time"></h5> 
            </div>
        `;
    }

    initTemplateTr() {
        let response = '';

        for (let idx = 0; idx < 8; idx++) {
            response += `
                <tr class="cb-tr">
                    ${this.initTemplateTh(idx)}
                </tr>
            `;
        }

        return response;
    }

    initTemplateTh(idxTr) {
        let response = '';

        for (let idx = 1; idx < 6; idx++) {
            response += `
                <th class="cb-th">
                    ${idxTr === 0 ? `<div class="cb-container-rule cb-container-rule-position-${idx}"></div>` : ''}
                </th>
            `;
        }

        return response;
    }

    initTemplateRule(props) {
        const { idx, className, date } = props;
        const classNames = className.concat(` cb-rule-day-${new Date(date.start).getDay()}`)
        const timeStart = `${new Date(date.start).getHours()} : ${new Date(date.start).getMinutes()}`;
        const timeEnd = `${new Date(date.end).getHours()} : ${new Date(date.end).getMinutes()}`;

        return `
            <a class="${classNames}" id="${idx}">
                <div class="cb-rule-content">
                    <h5 class="text text-extend cb-text time-start">
                        ${timeStart}
                    </h5>
                    <h5 class="text text-extend cb-text time-end">
                        ${timeEnd}
                    </h5>
                </div>
            </a>
        `;
    }

    initSource() {
        const ruleElList = [];

        this.activeSource.sourceRuleList.forEach(ruleProps => {
            const parser = new DOMParser();
            const templateStr = this.initTemplateRule(ruleProps);
            const ruleTemplate = parser.parseFromString(templateStr, 'text/html');
            const ruleEl = ruleTemplate.documentElement.querySelector('body > a');

            ruleEl.addEventListener('click', () => { this.handlerRule(ruleProps.idx) });
            this.intiSourcePosition(ruleEl, ruleProps);
            const classNameStatus = this.initEventStatus(ruleProps);
            classNameStatus && ruleEl.classList.toggle(classNameStatus, true);

            ruleElList.push(ruleEl);
        });

        return ruleElList;
    }

    handlerRule(idx) {
        this.parentElement.dispatchEvent(new CustomEvent('handlerRule', { bubbles: true, detail: { ruleIdx: idx }, }));
    }

    intiSourcePosition(el, props) {
        const { top, height } = calculateTopAndHeight(
            new Date(props.date.start),
            new Date(props.date.end),
            this.elements.calendar.table.offsetHeight,
        );

        if (top !== undefined && height !== undefined) {
            el.style.top = top;
            el.style.height = height;

            return;
        }

        el.classList.toggle('hidden', true);
        console.error('Start/End time error');
    }

    renderSource() {
        const sourceElList = this.initSource();

        sourceElList.forEach(source => {
            const classList = source.classList.toString();

            if (classList.includes('1')) {
                this.elements.calendar.ruleContainer1.appendChild(source);
            } else if (classList.includes('2')) {
                this.elements.calendar.ruleContainer2.appendChild(source);
            } else if (classList.includes('3')) {
                this.elements.calendar.ruleContainer3.appendChild(source);
            } else if (classList.includes('4')) {
                this.elements.calendar.ruleContainer4.appendChild(source);
            } else if (classList.includes('5')) {
                this.elements.calendar.ruleContainer5.appendChild(source);
            }
        });
    }

    initActiveSource() {
        const copySource = JSON.parse(JSON.stringify(this.source));

        this.activeSource.sourceRuleList = copySource.sourceRuleList.filter((props) => {
            if ((new Date(this.timeRange.start) < new Date(props.date.start) && new Date(this.timeRange.end) < new Date(props.date.end)) || new Date(props.date.end) < new Date(this.timeRange.start)) return false

            return true;
        });
    }

    initEventStatus(event) {
        const permission = getCookie('permission');

        switch (permission) {
            case 'user':
                if (event.status === 1) {
                    return '';
                } else {
                    return 'hidden';
                }
            case 'admin':
                if (event.status === 2) {
                    return 'cb-rule-close';
                } else if (event.status === 3) {
                    return 'cb-rule-booked';
                } else if (event.status === 4) {
                    return 'cb-rule-pending';
                } else {
                    return 'hidden';
                }
            case 'doctor':
                if (event.status === 3) {
                    return 'cb-rule-booked';
                } else {
                    return 'hidden';
                }
            default:
                if (event.status === 1) {
                    return '';
                } else {
                    return 'hidden';
                };
        }
    }
}

export default CalendarBox;