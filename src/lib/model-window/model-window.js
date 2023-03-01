class ModelWindow {
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

    initElements() {
        this.template = this.initTemplate();

        this.elements = {
            btnConfirm: this.template.querySelector('button#confirm'),
            btnCancel: this.template.querySelector('button#cancel'),
            content: this.template.querySelector('#content'),
            describtion: this.template.querySelector('.cancel-prenotation'),
        };

        this.parentElement.appendChild(this.template);
    }

    getDescribtionData() {
        this.elements.confirmPrenotation.addEventListener('click', () => {

            if (!(this.elements.describtion.value)) {
                this.elements.describtion.classList.toggle('data-wrong', true);
            }
            if (this.elements.describtion.value) {
                this.elements.describtion.classList.toggle('data-wrong', false);
            }
        })

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
        }

        if (!this.elements.content) {
            this.clouse();
            return;
        }

        content = this.elements.content.value;
        if (!this.validateText(content)) {
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

        if (this.props.modalType === 'confirm') {
            templateString = this.initTemplateConfirm();
        } else if (this.props.modalType === 'cancel') {
            templateString = this.initTemplateCancel();
        }

        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > div");
    }

    initTemplateConfirm() {
        return `
            <div class="wrapper-window-model">
                <div class="modal-window">
                    <div class="logo-model-window">
                        <h3>Prenotazione effetuatta<span class="text-accent">correttamente!</span></h3>
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
                                <textarea id="content" class="cancel-prenotation" cols="30" rows="10"></textarea>
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