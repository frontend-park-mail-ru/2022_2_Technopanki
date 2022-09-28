import Main from '../../views/Main.js';
import Signup from '../../views/Signup.js';

export const setUpRouter = to => {
    const root = document.querySelector('#root');

    const routesMap = {
        '/': {
            component: new Main(root),
        },
        '/signup': {
            component: new Signup(root),
        },
    };

    root.innerHTML = '';
    routesMap[to].component.render();
};
