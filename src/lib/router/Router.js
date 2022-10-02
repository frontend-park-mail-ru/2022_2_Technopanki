import { renderDOM } from '../core/renderDOM.js';

export const Router = {
    root: document.getElementById('root'),
    routePathMap: {},

    init: (root, routerPathMap) => {
        this.root = root;
        if (typeof routerPathMap !== 'undefined')
            this.routePathMap = routerPathMap;
    },

    addRoutePath(path, component) {
        this.routePathMap[path] = {
            component: component,
            render: () => renderDOM(this.root, component),
        };
    },

    routeTo(to, goBack) {
        if (!goBack) {
            window.history.pushState(null, null, to);
        }
        renderDOM(this.root, this.routePathMap[to].component);
    },
};
