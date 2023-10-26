export default class InputEmail extends HTMLElement {
    private input: HTMLInputElement;
    private textEl: HTMLElement | null = null;
    private errorEl: HTMLElement;

    constructor() {
        super();
        this.input = this.querySelector("input")!;
        // this.textEl = this.querySelector("p");
        const errorEl = document.createElement("p");
        errorEl.className = "error";
        // errorEl.style.display = "none";
        // this.insertBefore(errorEl, this.input);
        this.errorEl = errorEl;
        this.appendChild(errorEl);
        // this.errorEl = this.querySelector('p.error');
    }

    public validate(): boolean {
        this.hasValue();

        let isValid = true;
        if (this.input.required) {
            if (this.input.value === "") {
            //     isValid = false;
            //     if (this.getAttribute("state") !== "invalid") {
            //         this.reportError("This field is required.");
            //     }
            } else {
                if (new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/).test(this.input.value)) {
                    this.clearError();
                } else {
                    isValid = false;
                    if (this.getAttribute("state") !== "invalid") {
                        this.reportError("Invalid email format.");
                    }
                }
            }
        } else {
            this.clearError();
        }
        return isValid;
    }

    private hasValue = () => {
        if (this.input.value.length) {
            this.input.classList.add('has-value');
        }
        else {
            this.input.classList.remove('has-value');
        }
    }


    public reportError(error: string) {
        this.errorEl.innerHTML = error;
        this.errorEl.style.display = "block";
        if (this.textEl) {
            this.textEl.style.display = "none";
        }
        this.setAttribute("state", "invalid");
    }

    public clearError() {
        this.errorEl.style.display = "none";
        if (this.textEl) {
            this.textEl.style.display = "block";
        }
        this.setAttribute("state", "valid");
    }

    private handleBlur: EventListener = () => {
        this.validate();
    };

    private handleInput: EventListener = this.clearError.bind(this);

    connectedCallback() {
        this.input.addEventListener("input", this.handleInput);
        this.input.addEventListener("blur", this.handleBlur);
    }
}