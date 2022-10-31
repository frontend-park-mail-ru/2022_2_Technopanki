import { Component } from '../Reacts';
import './styles/globals.scss';
import { setTheme, toggleTheme } from './toggleTheme';
import StartPage from './views/StartPage/StartPage';
// TODO: rename navigator
import router from './router/navigator';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';

class App extends Component {
    render() {
        return <StartPage />;
    }
}

console.log('hello');

router.addNewPath('/', <App />);
router.addNewPath('/start', <StartPage />);
router.addNewPath('/signup', <SignUp />);
router.addNewPath('/signin', <SignIn />);
// router.setFallback('/404', <NotFound />);
router.navigate(location.pathname);

setTheme();
