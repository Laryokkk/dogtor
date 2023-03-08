class ModelWindow {
    constructor(parent, props, statusModalWindow) {
        this.parentElement = parent;
        this.props = props;
        this.statusModalWindow = statusModalWindow,

            this.template;
        this.elements = {};
    }

    init() {
        this.initElements();
        this.initEventListeners();
    }

    initElements() {
        this.template = this.initTemplate();

        this.elements = {
            btnConfirm: this.template.querySelector('button#confirm'),
            btnCancel: this.template.querySelector('button#cancel'),
            content: this.template.querySelector('.content'),
            describtion: this.template.querySelector('.cancel-prenotation'),
        };

        this.parentElement.appendChild(this.template);
    }

    getDescribtionData() {
        return this.elements.describtion.value;
    }

    initEventListeners() {

        this.elements.btnConfirm && this.elements.btnConfirm.addEventListener('click', () => { this.handlerConfirm() });
        this.elements.btnCancel && this.elements.btnCancel.addEventListener('click', () => { this.handlerCancel() });
    }

    handlerConfirm() {
        let content;

        if (this.elements.content) {
            content = this.elements.content.value;
            this.elements.content.classList.toggle('data-wrong',false);
            location.href = "../index.html";
        }

        if (!this.elements.content) {
            console.log("Close");
            location.href = "../index.html";
            this.clouse();
            return;
        }

        this.elements.content.classList.toggle('data-valid',true);

        content = this.elements.content.value;
        if (!this.validateText(content)) {
            console.log("VALIDATE");
            this.elements.content.classList.toggle('data-wrong',true);
            return;
        }

        this.parentElement.dispatchEvent(new CustomEvent('content-data', {
            bubbles: true,
            detail: {
                content,
            },
        }))

        this.clouse();
    }

    handlerCancel() {

        this.clouse();
    }

    clouse() {
        this.parentElement.removeChild(this.template);
    }

    initTemplate() {
        const parser = new DOMParser();
        let templateString;

        if (this.statusModalWindow === 'confirm') {
            templateString = this.initTemplateConfirm();
        } else if (this.statusModalWindow === 'cancel') {
            templateString = this.initTemplateCancel();
        }else if (this.statusModalWindow === 'confirmAdmin') {
            templateString = this.initTemplateConfirmAdmin();
        }

        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initTemplateConfirm() {
        return `
            <div class="wrapper-window-model">
                <div class="modal-window">
                    <div class="logo-model-window">
                        <h3>Prenotazione effetuatta <span class="text-accent">correttamente!</span></h3>
                    </div>

                <div class="wrapper-modal-content">

                    <div class="wrapper-prenotation-data">
                        <div class="logo-prenotation-data">
                            <h4>Vi asspettiamo</h4>
                        </div>
                        <div class="wrapper-data-prenotation">
                            <div class="prenotation-data">
                                ${this.initContentData()}
                            </div>
                        </div>
                    </div>

                    <div class="wrapper-buttons">
                    <button id="confirm" class="apply prenotation-apply">OK!</button>
                    </div>
                </div>
                </div>
            </div>
        `;
    }

    initTemplateConfirmAdmin() {
        return `
            <div class="wrapper-window-model">
                <div class="modal-window">
                    <div class="logo-model-window">
                        <h3>Prenotazione è <span class="text-accent">Accettata!</span></h3>
                    </div>

                <div class="wrapper-modal-content">

                    <div class="wrapper-prenotation-data">
                        <div class="wrapper-data-prenotation">
                            <div class="prenotation-data">
                                ${this.initContentAdmin()}
                            </div>
                        </div>
                    </div>

                    <div class="wrapper-buttons">
                    <button id="confirm" class="apply prenotation-apply">OK!</button>
                    </div>
                </div>
                </div>
            </div>
        `;
    }

    initTemplateCancel() {
        return `
        <div class="wrapper-window-model">
            <div class="modal-window-cancel">
                <div class="logo-model-window-cancel">
                    <h3>Prenotazione e’ stata <span class="text-accent">cancellata!</span></h3>
                </div>

                <div class="wrapper-modal-content-cancel">

                    <div class="wrapper-prenotation-data-cancel">
                        <div class="logo-prenotation-data">
                            <h4>Si chiede di scrivere la motivazione, quale sara inviata al cliente</h4>
                        </div>
                        <div class="wrapper-data-prenotation-cancel">
                            <div> <h4>Motivazione: </h4></div>
                            <div>
                                <textarea class="content" class="cancel-prenotation" cols="30" rows="10"></textarea>
                            </div>
                        </div>
                    </div>

                    <div class="wrapper-buttons">
                        <button id="cancel" class="cancel prenotation-apply delet-prenotation">Cancella</button>
                        <button id="confirm" class="apply prenotation-apply confirm-prenotation">Invia</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    }

    initContentData() {
        let resp = '';

        this.props.list.forEach(element => {
            

            if (element.title === 'Date') {
                resp += `
                <div class="prenotation-data">
                    <h4>  <span class="text-accent"> ${element.value}</span> </h4> 
                </div>
                `;
            }
            if (element.title === 'WhichTime') {
                resp += `
                <div class="prenotation-data">
                     <h4>  ${element.value} </h4>
                </div>
                `;
            }
            if (element.title === 'Time') {
                resp += `
                <div class="prenotation-data">
                    <h4> <span class="text-accent"> ${element.value}</span> </h4> 
                </div>
                `;
            }
        });

        return resp;

    }

    initContentAdmin() {
        let resp = '';

        this.props.list.forEach(element => {
            

            if (element.title === 'Date') {
                resp += `
                <div class="prenotation-data">
                    <h4>Data : </h4> 
                    <h4>  <span class="text-accent"> ${element.value}</span> </h4> 
                </div>
                `;
            }
            if (element.title === 'Time') {
                resp += `
                <div class="prenotation-data">
                    <h4>Ore : </h4> 
                    <h4> <span class="text-accent"> ${element.value}</span> </h4> 
                </div>
                `;
            }
        });

        return resp;

    }

    validateText(text) {
        const textToValidate = text.toString().replace(/^\s+/, '');

        if (textToValidate.length === 0) {
            return false;
        }

        if (/[^a-zA-Z\s]/.test(textToValidate)) {
            return false;
        }

        return true;
    }
}

export default ModelWindow;