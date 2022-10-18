import { Component } from './packages/reacts/Component.js';
import { createRoot } from './packages/reacts-dom/root/index.js';

// Router.addRoutePath('/', Main);
// Router.addRoutePath('/signup', SignUp);
// Router.addRoutePath('/signin', SignIn);
// Router.addRoutePath('/vacancies', Vacancies);
//
// window.addEventListener('popstate', () => {
//     Router.render(location.pathname, true);
// });
//
// authenticateUser().then(() => Router.render(location.pathname));

class Header extends Component {
    render() {
        <header style={'display: flex, flex-direction: row'}>
            <p>Item 1</p>
            <p>Item 2</p>
        </header>;
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <h1>Hello world!</h1>
            </div>
        );
    }
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
