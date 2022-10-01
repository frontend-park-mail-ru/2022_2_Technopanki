import SignUp from '../../views/SignUp.js';
import { renderDOM } from '../core/renderDOM.js';
import Main from '../../views/Main.js';

export const Router = to => {
    const root = document.querySelector('#root');

    const routesMap = {
        '/': {
            component: () => renderDOM(root, Main),
        },
        '/signup': {
            component: () => renderDOM(root, SignUp),
        },
    };

    routesMap[to].component();
};
