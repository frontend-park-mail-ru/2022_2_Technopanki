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

const getVacancies = async () => {
    const response = await fetch("http://localhost:8080/api/vacancy", {
        method: 'GET',
        credentials: 'include',
        mode: 'no-cors'
    }).json().then(data => console.log(data))
}

getVacancies()

Router.render(location.pathname);
