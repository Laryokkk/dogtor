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
            containerStats: this.template.querySelector('div.statistics'),
            containerHistory: this.template.querySelector('div.history'),
        };

        const cookieGoogleID = getCookie("login_id");
        const permission = getCookie("permission");

        this.elements.containerSignInUp.classList.toggle('hidden', (cookieGoogleID && cookieGoogleID !== ''))
        this.elements.containerSignOut.classList.toggle('hidden', !(cookieGoogleID && cookieGoogleID !== ''))

        if (permission === 'user' && cookieGoogleID && cookieGoogleID !== '') {
            this.elements.containerHistory.classList.toggle('hidden', false);
        }

        if ((permission === 'admin' || permission === 'doctor') && cookieGoogleID && cookieGoogleID !== '') {
            this.elements.containerStats.classList.toggle('hidden', false);
        }

        this.parentElement.appendChild(this.template);
    }

    initEventListeners() {
    }

    initTemplate() {
        const parser = new DOMParser();
        const templateString = `<header>
            <a href="/">
                <img class="logo" src="/classi/5e/vysotskyy/assets/header_logo.svg" alt="logo of the 'Cani Sani'">
            </a>
            <div class="container-data">
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
            <div class="statistics hidden">
                <a href="/classi/5e/vysotskyy/src/routes/statistics/index.html">
                    <h4 class="text text-active">
                        <span class="text-heading text-accent">A</span>ggiungi <span class="text-heading text-accent">V</span>isita
                    </h4>
                </a>
            </div>
            <div class="history hidden">
                <a href="/classi/5e/vysotskyy/src/routes/account/index.html">
                    <h4 class="text text-active">
                        <span class="text-heading text-accent">S</span>toria
                    </h4>
                </a>
            </div>
            <div class="sign-out hidden">
                <a href="/logout.php">
                    <h4 class="text text-active">
                        <span class="text-heading text-accent">S</span>ign <span class="text-heading text-accent">O</span>ut
                    </h4>
                </a>
            </div>
            </div>
        </header>`;
        const templateElement = parser.parseFromString(templateString, 'text/html');
        return templateElement.documentElement.querySelector("body > header");
    }
}

export default Header;