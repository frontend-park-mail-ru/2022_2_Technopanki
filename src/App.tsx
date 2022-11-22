import './styles/globals.scss';
import { setTheme } from './utils/toggleTheme';
import RadioButton from './components/UI-kit/radioButton/radioButton';
import router from './router/navigator';
import { ReactsComponent } from '../Reacts/reacts/src/Component';
import { ROUTER_PATHS } from './config/router.config';
import StartPage from './views/StartPage/StartPage';

class SomeComponent extends ReactsComponent<{ counter: number }> {
    render() {
        return (
            <div>
                <RadioButton
                    id={'even'}
                    name={'toggle'}
                    value={'even'}
                    checked={this.props.counter % 2 == 0}
                >
                    Hello
                </RadioButton>
                <RadioButton
                    id={'notEven'}
                    name={'toggle'}
                    value={'notEven'}
                    checked={this.props.counter % 2 != 0}
                >
                    World
                </RadioButton>
            </div>
        );
    }
}

// class App extends ReactsComponent {
//     state = {
//         counter: 2,
//     };
//
//     render() {
//         return (
//             <div>
//                 <button
//                     onClick={() =>
//                         this.setState(state => ({ counter: state.counter + 1 }))
//                     }
//                 >
//                     Increment
//                 </button>
//                 <SomeComponent counter={this.state.counter} />
//             </div>
//         );
//     }
// }

class App extends ReactsComponent {
    render() {
        return <StartPage />;
    }
}

router.disableScrollRestoration();

router.addNewPath({ path: '/', validator: (url: string) => url === '/' }, App);
router.addNewPaths(ROUTER_PATHS);

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
