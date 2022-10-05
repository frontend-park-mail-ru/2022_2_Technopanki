import { Router } from './framework/router/Router.js';
import SignUp from './views/SignUp.js';
import SignIn from './views/SignIn.js';
import Main from './views/Main.js';
import Vacancies from './views/Vacancies.js';
import { SERVER_URL } from './services/network/URLs.js';
import { userModel } from './services/model/userModel.js';

Router.addRoutePath('/', Main);
Router.addRoutePath('/signup', SignUp);
Router.addRoutePath('/signin', SignIn);
Router.addRoutePath('/vacancies', Vacancies);

const getAuth = async () => {
    const response = await fetch(SERVER_URL + '/auth/', {
        credentials: 'include',
    });

    return await response.json().then(data => {
        if (!data.error) {
            userModel.name = data.name;
            userModel.surname = data.surname;
        }
    });
};

getAuth();

window.addEventListener('popstate', () => {
    Router.render(location.pathname, true);
});

Router.render(location.pathname);
