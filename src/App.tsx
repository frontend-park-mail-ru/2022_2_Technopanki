import { Component, renderNode } from '../Reacts';
import './styles/globals.scss';
import { setTheme } from './toggleTheme';
import StartPage from './views/StartPage/StartPage';
// TODO: rename navigator
import router from './router/navigator';
import { ROUTER_PATHS } from './config/router.config';
import { authService } from './services/authService';
import { dispatch } from './store';
import { userActions } from './store/user/actions';

class App extends Component {
    render() {
        return <StartPage />;
    }
}

router.disableScrollRestoration();

router.addNewPath({ path: '/', validator: (url: string) => url === '/' }, App);
router.addNewPaths(ROUTER_PATHS);
// router.setFallback('/404', <NotFound />);

authService
    .auth()
    .then(body => {
        dispatch(
            userActions.SIGN_IN(
                body.id,
                body.user_type === 'employer'
                    ? body.company_name
                    : body.applicant_name,
                body.applicant_surname,
                body.user_type,
            ),
        );
        router.navigate(location.pathname);
    })
    .catch(() => {
        console.log('not authorized');
        router.navigate(location.pathname);
    });

setTheme();
