class Header {
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
        this.template = this.initTemplate();

        this.elements = {
            header: this.template,
            logo: this.template.querySelector('img.logo'),
            linkSignIn: this.template.querySelector('a#sign-in'),
            linkSignUp: this.template.querySelector('a#sign-up'),
        };

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
        this.elements.logo.addEventListener('click', (e) => {
            e.preventDefault();

            console.log('click logo');
        });

        this.elements.linkSignIn.addEventListener('click', (e) => {
            e.preventDefault();

            console.log('click sign in');
        });

        this.elements.linkSignUp.addEventListener('click', (e) => {
            e.preventDefault();

            console.log('click sign up');
        });
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `
        <header>
            <img class="logo" src="/assets/header_logo.svg" alt="logo of the 'Cani Sani'">
            <div class="account">
                <a id="sign-in" href="">
                    <h4 class="text text-active">
                        <span class="text-accent">S</span>ign <span class="text-accent">I</span>n
                    </h4>
                </a>
                <a id="sign-up" href="">
                    <h4 class="text text-active">
                        <span class="text-accent">S</span>ign <span class="text-accent">U</span>p
                    </h4>
                </a>
            </div>
        </header>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > header");
    }
}

export default Header;