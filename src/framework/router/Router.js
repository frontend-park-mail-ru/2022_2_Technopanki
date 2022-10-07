import { renderDOM } from '../core/renderDOM.js';

/**
 * Basic Router class
 * @type {{routePathMap: Map<string, Component>, root: HTMLElement, addRoutePath(string, Component): void, render(string, bool): void}}
 */
export const Router = {
    root: document.getElementById('root'),
    routePathMap: new Map(),

    addRoutePath(path, component) {
        this.routePathMap.set(path, component);
    },

    render(path, goBack) {
        if (!goBack) {
            window.history.pushState(null, null, path);
        }
        renderDOM(this.root, this.routePathMap.get(path));
    },
};
