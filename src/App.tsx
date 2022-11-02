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

class App extends Component {
    render() {
        return <StartPage />;
    }
}

// TODO: переделать роутер: на каждый путь будет еще один роутер, который определит, на какую страницу перекинуть
router.addNewPath('/', <App />);
router.addNewPath('/start', <StartPage />);
router.addNewPath('/signup', <SignUp />);
router.addNewPath('/signin', <SignIn />);
router.addNewPath('/employer', <Profile />);
router.addNewPath('/employer/settings', <ProfileSettings />);
router.addNewPath('/vacancy', <Vacancy />);
router.addNewPath('/vacancy/settings', <VacancySettings />);
// router.setFallback('/404', <NotFound />);
router.navigate(location.pathname);

setTheme();
