import { Router } from './framework/router/Router.js';
import SignUp from './views/SignUp.js';
import SIgnIn from './views/SignIn.js';
import Main from './views/Main.js';
import Vacancies from './views/Vacancies.js';

Router.addRoutePath('/', Main);
Router.addRoutePath('/signup', SignUp);
Router.addRoutePath('/signin', SIgnIn);
Router.addRoutePath('/vacancies', Vacancies);

window.addEventListener('popstate', () => {
    Router.render(location.pathname, true);
});

Router.render(location.pathname);
