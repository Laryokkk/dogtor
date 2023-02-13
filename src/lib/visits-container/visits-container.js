class VisitsContainer {
    constructor(parent, props) {
        this.parentElement = parent;
        this.props = props;
        this.template;
        this.elements = {};
    }

    init() {
        this.initElements();
        this.initEventListeners();
    }

    destroy() {
        if (this.elements === {}) {
            return;
        }

        // Todo
    }

    initElements() {
        this.template = this.initTemplate(this.props);
        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
    
    }

    initTemplate(props) {


        let doctorName = null;
        let startTime = null;
        let endTime = null;
        let data = null;

        props.forEach(element => {
            console.log(element.value);
            if (element.title === "Inizio") {
                startTime = element.value;
            }
            if (element.title === "Fine") {
                endTime = element.value;
            }
            if (element.title === "Data") {
                data = element.value;
            }
            if (element.title === "Doctor") {
                doctorName = element.value;
            }
        });


        const parser = new DOMParser();
        const templateString = `
    <div class="wrapper-container">
        <div class="wrapper-content">
            <div class="time-start flex padding-line">
                <p class="text-light  text-visit-form">Inizio:</p>
                <p class="text-accent text-light padding-left text-visit-form">${startTime}</p>
            </div>
            <div class="time-end flex padding-line">
                <p class="text-light  text-visit-form">Fine:</p>
                <p class="text-accent text-light padding-left text-visit-form">${endTime}</p>
            </div>
            <div class="date flex padding-line">
                <p class="text-light  text-visit-form">Data:</p>
                <p class="text-light padding-left text-visit-form">${data}</p>
            </div>
            <div class="dogtor flex padding-line">
                <p class="text-light  text-visit-form">Doctor:</p>
                <p class="text-light padding-left text-visit-form">${doctorName}</p>
            </div>
            <button class="see-visit"> <p class="text-light see-visit-text text-extend" >Guarda</p></button>
        </div>
    </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-container");
    }
}

export default VisitsContainer;
