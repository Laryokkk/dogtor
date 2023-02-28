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
            containerSignInUp: this.template.querySelector('div.sign-in-up'),
            containerSignOut: this.template.querySelector('div.sign-out'),
        };

        const cookieGoogleID = getCookie("login_id");

        this.elements.containerSignInUp.classList.toggle('hidden', (cookieGoogleID && cookieGoogleID !== ''))
        this.elements.containerSignOut.classList.toggle('hidden', !(cookieGoogleID && cookieGoogleID !== ''))

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `<header>
            <img class="logo" src="/assets/header_logo.svg" alt="logo of the 'Cani Sani'">
            <div class="sign-in-up hidden">
                <a id="sign-in" href="/redirect.php">
                    <h4 class="text text-active">
                        <span class="text-heading text-accent">S</span>ign <span class="text-heading text-accent">I</span>n
                    </h4>
                </a>
                /
                <a id="sign-up" href="/redirect.php">
                    <h4 class="text text-active">
                        <span class="text-heading text-accent">S</span>ign <span class="text-heading text-accent">U</span>p
                    </h4>
                </a>
            </div>
            <div class="sign-out hidden">
                <a id="sign-in" href="/logout.php">
                    <h4 class="text text-active">
                        <span class="text-heading text-accent">S</span>ign <span class="text-heading text-accent">O</span>ut
                    </h4>
                </a>
            </div>
        </header>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > header");
    }
}

export default Header;