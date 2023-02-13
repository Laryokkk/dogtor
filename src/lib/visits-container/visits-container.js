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

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <div class="wrapper-container">
            <div class="wrapper-content">
                <div class="time-start  padding-line">
                ${this.initTimeStart()}
                </div>
                <div class="time-end  padding-line">
                ${this.initEndTime()}
                </div>
                <div class="date  padding-line">
                ${this.initData()}
                </div>
                <div class="dogtor  padding-line">
                ${this.initDoctorName()}
                </div>
                <button class="see-visit"> <h4 class="text-light see-visit-text text-extend" >Guarda</h4></button>
            </div>
        </div>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body> .wrapper-container");
    }

    initTimeStart() {
        let response = '';

        this.props.forEach(section => {
            if (section.title === "Inizio") {
                response += ` 
                <h4 class="text-light  text-visit-form">Inizio:</h4>
                <h4 class="text-accent text-light padding-left text-visit-form">${section.value}</h4>`;
            }
        });

        return response;

    }

    initEndTime() {
        let response = '';

        this.props.forEach(section => {
            if (section.title === "Fine") {
                response += `
                <h4 class="text-light  text-visit-form">Fine:</h4>
            <h4 class="text-accent text-light padding-left text-visit-form">${section.value}  </h4>`;
            }
        });

        return response;

    }

    initData() {
        let response = '';

        this.props.forEach(section => {
            if (section.title === "Data") {
                response += `<h4 class="text-light  text-visit-form">Data:</p>
                <h4 class="text-light padding-left text-visit-form">${section.value} </h4>`;
            }
        });

        return response;

    }

    initDoctorName() {
        let response = '';

        this.props.forEach(section => {
            if (section.title === "Doctor") {
                response += `
                <h4 class="text-light  text-visit-form">Doctor:</p>
                <h4 class="text-light padding-left text-visit-form">${section.value}</h4>`;
            }
        });

        return response;

    }
}

export default VisitsContainer;
