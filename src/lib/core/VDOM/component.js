import { createDiff } from './operations.js';
import { applyDiff } from './render.js';

export class Component {
    props;
    state;

    #mountedElement;
    #rootNode;

    setState(updater) {
        this.state = updater(this.state);
        applyDiff(this.#mountedElement, this.getUpdateDiff());
    }

    setProps(props) {
        this.props = props;
        return this.getUpdateDiff();
    }

    // Inits props and calls render for the first time.
    // Returns current rootNode
    initProps(props) {
        this.props = props;
        this.#rootNode = this.render();
        return this.#rootNode;
    }

    // Will be called then component is mounted in DOM.
    notifyMounted(elem) {
        this.#mountedElement = elem;
    }

    // Generates update. This method is responsible for "reactiveness" of component
    getUpdateDiff() {
        const newRootNode = this.render();
        const diff = createDiff(this.#rootNode, newRootNode);
        if (diff.type === 'replace') {
            // TODO: возможно переделать
        }
        this.#rootNode = newRootNode;

        return diff;
    }

    unmout() {
        this.#mountedElement = null;
    }

    render() {}
}
