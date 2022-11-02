import { Component } from '../Reacts';
import './styles/globals.scss';
import { setTheme, toggleTheme } from './toggleTheme';
import StartPage from './views/StartPage/StartPage';
// TODO: rename navigator
import router from './router/navigator';
import { ROUTER_PATHS } from './config/router.config';

class App extends Component {
    render() {
        return <StartPage />;
    }
}

router.disableScrollRestoration();

router.addNewPath(
    { path: '/', validator: (url: string) => url === '/' },
    <App />,
);
router.addNewPaths(ROUTER_PATHS);
// router.setFallback('/404', <NotFound />);
router.navigate(location.pathname);
setTheme();
