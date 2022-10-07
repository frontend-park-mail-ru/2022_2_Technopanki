import { Router } from './framework/router/Router.js';
import SignUp from './views/SignUp.js';
import SignIn from './views/SignIn.js';
import Main from './views/Main.js';
import Vacancies from './views/Vacancies.js';
import { authenticateUser } from './services/network/authenticateUser.js';

Router.addRoutePath('/', Main);
Router.addRoutePath('/signup', SignUp);
Router.addRoutePath('/signin', SignIn);
Router.addRoutePath('/vacancies', Vacancies);

window.addEventListener('popstate', () => {
    Router.render(location.pathname, true);
});

authenticateUser().then(() => Router.render(location.pathname));
