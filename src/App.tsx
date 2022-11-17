import { Component, renderNode } from '../__Reacts__old_version__';
import './styles/globals.scss';
import { setTheme } from './utils/toggleTheme';
import StartPage from './views/StartPage/StartPage';
// TODO: rename navigator
import router from './router/navigator';
import { ReactsComponent } from '../Reacts/reacts/src/Component';

class App extends ReactsComponent {
    render() {
        return <StartPage />;
    }
}

router.disableScrollRestoration();

router.addNewPath({ path: '/', validator: (url: string) => url === '/' }, App);
// router.addNewPaths(ROUTER_PATHS);
// router.setFallback('/404', <NotFound />);

// authService
//     .auth()
//     .then(body => {
//         dispatch(
//             userActions.SIGN_IN(
//                 body.id,
//                 body.user_type === 'employer'
//                     ? body.company_name
//                     : body.applicant_name,
//                 body.applicant_surname,
//                 body.image ?? body.imgSrc,
//                 body.user_type,
//             ),
//         );
//         router.navigate(location.pathname);
//     })
//     .catch(() => {
//         router.navigate(location.pathname);
//     });

router.navigate(location.pathname);
setTheme();
