import { renderDOM } from '../core/renderDOM.js';

export const Router = {
    root: document.getElementById('root'),
    routePathMap: {},

    addRoutePath(path, component) {
        this.routePathMap[path] = {
            component: component,
        };
    },

    render(path, goBack) {
        if (!goBack) {
            window.history.pushState(null, null, path);
        }
        renderDOM(this.root, this.routePathMap[path].component);
    },
};
