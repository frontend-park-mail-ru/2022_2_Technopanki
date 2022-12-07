import './styles/globals.scss';
import { setTheme } from './utils/toggleTheme';
import router from './router/navigator';
import { ReactsComponent } from '../Reacts/reacts/src/Component';
import { ROUTER_PATHS } from './config/router.config';
import { authService, USER_TYPE } from './services/auth/authService';
import { dispatch } from './store';
import StartPage from './views/StartPage/StartPage';
import { userActions } from './store/user/actions';

class App extends ReactsComponent {
    render() {
        return <StartPage />;
    }
}

document.querySelector('#root').innerHTML = '';

router.disableScrollRestoration();

router.addNewPath({ path: '/', validator: (url: string) => url === '/' }, App);
router.addNewPaths(ROUTER_PATHS);

authService
    .auth()
    .then(body => {
        dispatch(
            userActions.SIGN_IN(
                body.id.toString(),
                body.user_type === USER_TYPE.EMPLOYER
                    ? body.company_name
                    : body.applicant_name,
                body.applicant_surname,
                body.email,
                body.image,
                body.user_type,
            ),
        );
        router.navigate(location.pathname);
    })
    .catch(() => {
        router.navigate(location.pathname);
    });

setTheme();
