import Main from './views/Main.js';
import { Router } from './lib/router/Router.js';
import SignUp from './views/SignUp.js';
import SIgnIn from './views/SignIn.js';
import MainPage from './views/MainPage.js';
import Vacancies from './views/Vacancies.js';

Router.addRoutePath('/', Main);
Router.addRoutePath('/signup', SignUp);
Router.addRoutePath('/signin', SIgnIn);
Router.addRoutePath('/main', MainPage);
Router.addRoutePath('/vacancies', Vacancies)

window.addEventListener('popstate', () => {
    Router.render(location.pathname, true);
});

Router.render(location.pathname);
