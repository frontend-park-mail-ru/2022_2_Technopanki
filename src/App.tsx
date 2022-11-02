import { Component } from '../Reacts';
import './styles/globals.scss';
import { setTheme, toggleTheme } from './toggleTheme';
import StartPage from './views/StartPage/StartPage';
// TODO: rename navigator
import router from './router/navigator';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import Profile from './views/Employer/Profile';
import Vacancy from './views/Vacancy';
import EmployerSettings from './views/Vacancy/VacancySettings';
import VacancySettings from './views/Vacancy/VacancySettings';
import ProfileSettings from './views/Employer/ProfileSettings';
import VacancyResponses from './views/Vacancy/VacancyResponses';
import Vacancies from './views/Vacancies/Vacancies';

class App extends Component {
    render() {
        return <StartPage />;
    }
}

router.disableScrollRestoration();

// TODO: переделать роутер: на каждый путь будет еще один роутер, который определит, на какую страницу перекинуть
router.addNewPath(
    { path: '/', validator: (url: string) => url === '/' },
    <App />,
);
router.addNewPath(
    { path: '/start', validator: (url: string) => url === '/start' },
    <StartPage />,
);
router.addNewPath(
    { path: '/signup', validator: (url: string) => url === '/signup' },
    <SignUp />,
);
router.addNewPath(
    { path: '/signin', validator: (url: string) => url === '/signin' },
    <SignIn />,
);
router.addNewPath(
    { path: '/employer', validator: (url: string) => url === '/employer' },
    <Profile />,
);
router.addNewPath(
    {
        path: '/employer/settings',
        validator: (url: string) => url === '/employer/settings',
    },
    <ProfileSettings />,
);
router.addNewPath(
    {
        path: '/vacancy',
        validator: (url: string) => /vacancy\/[1-9]+/.test(url),
    },
    <Vacancy />,
);
router.addNewPath(
    {
        path: '/vacancy/settings',
        validator: (url: string) => url === 'vacancy/settings',
    },
    <VacancySettings />,
);
router.addNewPath(
    {
        path: '/vacancy/responses',
        validator: (url: string) => url === 'vacancy/responses',
    },
    <VacancyResponses />,
);
router.addNewPath(
    { path: '/vacancies', validator: (url: string) => url === 'vacancies' },
    <Vacancies />,
);
// router.setFallback('/404', <NotFound />);
router.navigate(location.pathname);

setTheme();
