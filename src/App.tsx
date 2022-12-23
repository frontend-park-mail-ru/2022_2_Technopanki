import './styles/globals.scss';
import { setTheme } from './utils/toggleTheme';
import router from './router/navigator';
import { ReactsComponent } from '../Reacts/reacts/src/Component';
import { ROUTER_PATHS } from './config/router.config';
import { authService, USER_TYPE } from './services/auth/authService';
import { dispatch } from './store';
import StartPage from './views/StartPage/StartPage';
import { userActions } from './store/user/actions';
import Header from './components/UI-kit/header/Header';

class App extends ReactsComponent {
    render() {
        return <StartPage />;
    }
}

class NotFound extends ReactsComponent {
    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header />
                <div className="flex justify-content-center align-items-center w-100v h-100v">
                    <h1 className="color-400">Oops... 404</h1>
                </div>
            </div>
        );
    }
}

document.querySelector('#root').innerHTML = '';

router.disableScrollRestoration();

router.addNewPath({ path: '/', validator: (url: string) => url === '/' }, App);
router.addNewPath(
    { path: '/404', validator: (url: string) => url === '/404' },
    NotFound,
);
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
                body.two_factor_sign_in,
                body.user_type,
            ),
        );
        router.navigate(location.pathname);
    })
    .catch(() => {
        router.navigate(location.pathname);
    });

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('https://jobflow.su/sw.js').then(() =>
        navigator.serviceWorker.ready
            .then(worker => {
                worker.active;
            })
            .catch(err => console.error(err)),
    );
}

setTheme();
