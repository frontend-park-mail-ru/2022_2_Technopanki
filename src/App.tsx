import './styles/globals.scss';
import { setTheme } from './utils/toggleTheme';
import router from './router/navigator';
import { ReactsComponent } from '../Reacts/reacts/src/Component';
import { ROUTER_PATHS } from './config/router.config';
import { authService } from './services/authService';
import { dispatch } from './store';
import StartPage from './views/StartPage/StartPage';
import { userActions } from './store/user/actions';

class App extends ReactsComponent {
    render() {
        return <StartPage />;
    }
}

router.disableScrollRestoration();

router.addNewPath({ path: '/', validator: (url: string) => url === '/' }, App);
router.addNewPaths(ROUTER_PATHS);

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
                body.image ?? body.imgSrc,
                body.user_type,
            ),
        );
        router.navigate(location.pathname);
    })
    .catch(() => {
        router.navigate(location.pathname);
    });

setTheme();
