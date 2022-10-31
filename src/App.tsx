import { Component } from '../Reacts';
import './styles/globals.scss';
import { setTheme, toggleTheme } from './toggleTheme';
import StartPage from './views/StartPage/StartPage';
// TODO: rename navigator
import router from './router/navigator';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import Profile from './views/Employer/Profile/Profile';

class App extends Component {
    render() {
        return <StartPage />;
    }
}

router.addNewPath('/', <App />);
router.addNewPath('/start', <StartPage />);
router.addNewPath('/signup', <SignUp />);
router.addNewPath('/signin', <SignIn />);
router.addNewPath('/employer', <Profile />);
// router.setFallback('/404', <NotFound />);
router.navigate(location.pathname);

setTheme();
