import SignUp from '../../views/SignUp.js';
import { renderDOM } from '../core/renderDOM.js';
import Main from '../../views/Main.js';

class Router {
    #root;
    #routePathMap = {};

    constructor(root, routerPathMap) {
        this.#root = root;
        if (typeof routerPathMap !== 'undefined')
            this.#routePathMap = routerPathMap;
    }

    addRoutePath = (path, component) => {
        this.#routePathMap[path].component = component;
        this.#routePathMap[path].render = () =>
            renderDOM(this.#root, component);
    };

    // render()
    routeTo(to, goBack) {
        if (typeof goBack === 'undefined' || goBack === false) {
            window.history.pushState(null, null, to);
        }
        renderDOM(this.#root, this.#routePathMap[to].component);
    }
}

export default new Router();
