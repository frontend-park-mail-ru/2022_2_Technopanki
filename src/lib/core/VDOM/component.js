import { createDiff } from './operations.js';
import { applyDiff } from './render.js';

/**
 * An interface defining a component
 * from which all other components inherit
 */
export class Component {
    props;
    state;

    #mountedElement;
    #rootNode;

    /**
     * Creates new state object and call rerender of component
     * @param {function} updater - function that updates state
     */
    setState(updater) {
        this.state = updater(this.state);
        applyDiff(this.#mountedElement, this.getUpdateDiff());
    }

    /**
     * Inits props and calls render for the first time.
     * Returns current rootNode
     * @param props
     * @returns {*} - node element
     */
    initProps(props) {
        this.props = props;
        this.#rootNode = this.render();
        setTimeout(() => this.componentWillMount());
        return this.#rootNode;
    }

    /**
     * Hook that will be called then component is first mounted in DOM
     */
    componentWillMount = () => {};

    /**
     * Will be called then component is mounted in DOM.
     * @param elem - new DOM element
     */
    notifyMounted(elem) {
        this.#mountedElement = elem;
    }

    /**
     * Generates update of this component. This method is responsible for "reactiveness" of component
     * @returns {{type: string}|{newNode: *, type: string}|{childrenUpdater: *, type: string, attrUpdater: *}}
     */
    getUpdateDiff() {
        const newRootNode = this.render();
        const diff = createDiff(this.#rootNode, newRootNode);
        this.#rootNode = newRootNode;

        return diff;
    }

    render() {}
}
