export default class Component {
    #childElements;
    #state;
    #parent;

    constructor(parent, state) {
        this.#parent = parent;
        this.#state = state;
    }

    get items() {
        return this.#childElements;
    }

    set items(value) {
        this.#childElements = Object.entries(value);
    }

    get state() {
        return this.#state;
    }

    set state(value) {
        this.#state = value;
    }

    render() {
        this.#parent.innerHTML = '';

        if (this.#childElements !== undefined) {
            this.#childElements.forEach(([_, element]) =>
                this.#state.appendChild(element),
            );
        }

        this.#parent.appendChild(this.#state);
    }

    renderAsComponent() {}
}
