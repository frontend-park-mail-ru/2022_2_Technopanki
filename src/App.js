import Main from './views/Main.js';
import { Router } from './lib/router/Router.js';
import SignUp from './views/SignUp.js';

Router.addRoutePath('/', Main);
Router.addRoutePath('/signup', SignUp);

window.addEventListener('popstate', e => {
    Router.routeTo(location.pathname, true);
});

Router.routeTo(location.pathname);
